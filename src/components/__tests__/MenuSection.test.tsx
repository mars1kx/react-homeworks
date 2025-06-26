import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { vi } from 'vitest';
import MenuSection from '../MenuSection/MenuSection';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../../store/slices/cartSlice';
import authReducer from '../../store/slices/authSlice';
import { Meal } from '../../store/types';

vi.mock('../../__mocks__/api', () => ({
  saveOrderApi: vi.fn().mockReturnValue({
    url: 'https://example.com/api/orders',
    options: { method: 'POST' }
  })
}));

global.fetch = vi.fn().mockImplementation(() => 
  Promise.resolve({
    ok: true,
    status: 200,
    json: () => Promise.resolve({ success: true })
  })
);

vi.mock('../../contexts/ThemeContext', () => ({
  useTheme: () => ({ theme: 'light' }),
}));

const alertMock = vi.fn();
window.alert = alertMock;

vi.mock('../../store/slices/authSlice', () => {
  const actual = vi.importActual('../../store/slices/authSlice');
  return {
    ...actual,
    default: (state = {
      currentUser: null,
      loading: false,
      error: null
    }, action: any) => {
      return state;
    }
  };
});

describe('MenuSection', () => {
  const mockProducts: Meal[] = [
    {
      id: '1',
      meal: 'Test Burger',
      price: 10.99,
      img: 'test-burger.png',
      description: 'A delicious test burger',
      category: 'burger'
    },
    {
      id: '2',
      meal: 'Test Pizza',
      price: 15.99,
      img: 'test-pizza.png',
      description: 'A delicious test pizza',
      category: 'pizza'
    }
  ];

  const createTestStore = (isAuthenticated: boolean = true) => {
    return configureStore({
      reducer: {
        cart: cartReducer,
        auth: (state = {
          currentUser: isAuthenticated ? { uid: '123', email: 'test@example.com' } : null,
          loading: false,
          error: null
        }, action: any) => state
      }
    });
  };

  const renderWithRedux = (component: React.ReactElement, isAuthenticated: boolean = true) => {
    const store = createTestStore(isAuthenticated);
    return {
      ...render(<Provider store={store}>{component}</Provider>),
      store,
    };
  };

  beforeEach(() => {
    alertMock.mockClear();
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('renders products correctly', () => {
    renderWithRedux(<MenuSection products={mockProducts} />);
    
    expect(screen.getByText('Test Burger')).toBeInTheDocument();
    expect(screen.getByText('Test Pizza')).toBeInTheDocument();
  });

  it('filters products by category', () => {
    renderWithRedux(<MenuSection products={mockProducts} />);
    
    const burgerCategoryButton = screen.getByText('burger');
    fireEvent.click(burgerCategoryButton);
    
    expect(screen.getByText('Test Burger')).toBeInTheDocument();
    expect(screen.queryByText('Test Pizza')).not.toBeInTheDocument();
    
    const pizzaCategoryButton = screen.getByText('pizza');
    fireEvent.click(pizzaCategoryButton);
    
    expect(screen.queryByText('Test Burger')).not.toBeInTheDocument();
    expect(screen.getByText('Test Pizza')).toBeInTheDocument();
    
    fireEvent.click(pizzaCategoryButton);
    
    expect(screen.getByText('Test Burger')).toBeInTheDocument();
    expect(screen.getByText('Test Pizza')).toBeInTheDocument();
  });

  it('adds products to cart when user is authenticated', async () => {
    const { store } = renderWithRedux(<MenuSection products={mockProducts} />);
    
    const addToCartButtons = screen.getAllByText('Add to cart');
    
    await act(async () => {
      fireEvent.click(addToCartButtons[0]);
    });
    
    await waitFor(() => {
      const cartState = store.getState().cart;
      expect(cartState.items).toHaveLength(1);
      expect(cartState.items[0].product.id).toBe('1');
      expect(cartState.items[0].count).toBe(1);
    });
  });

  it('shows alert when trying to add to cart without authentication', async () => {
    renderWithRedux(<MenuSection products={mockProducts} />, false);
    
    const addToCartButtons = screen.getAllByText('Add to cart');
    
    await act(async () => {
      fireEvent.click(addToCartButtons[0]);
    });
    
    expect(alertMock).toHaveBeenCalledWith('Please login to add items to the cart');
  });
}); 