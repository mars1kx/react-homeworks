import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import { vi } from 'vitest';
import Header from '../Header/Header';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer, { addToCart } from '../../store/slices/cartSlice';
import { BrowserRouter } from 'react-router-dom';

vi.mock('../ThemeToggle/ThemeToggle', () => ({
  default: () => <div data-testid="theme-toggle">Theme Toggle</div>
}));

vi.mock('../../contexts/ThemeContext', () => ({
  useTheme: () => ({ theme: 'light' }),
}));

vi.mock('../../utils/logger', () => ({
  default: {
    info: vi.fn(),
    error: vi.fn(),
    warn: vi.fn()
  }
}));

describe('Header', () => {
  const createTestStore = (isAuthenticated: boolean = false) => {
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

  const renderWithRedux = (component: React.ReactElement, isAuthenticated: boolean = false) => {
    const store = createTestStore(isAuthenticated);
    return {
      ...render(
        <Provider store={store}>
          <BrowserRouter>
            {component}
          </BrowserRouter>
        </Provider>
      ),
      store,
    };
  };

  beforeEach(() => {
    localStorage.clear();
  });

  it('displays cart with zero items when cart is empty', () => {
    renderWithRedux(<Header />);
    
    const cartBadge = screen.getByText('0');
    expect(cartBadge).toBeInTheDocument();
  });

  it('displays correct number of items in cart', async () => {
    const { store } = renderWithRedux(<Header />);
    
    await act(async () => {
      store.dispatch(
        addToCart({
          product: {
            id: '1',
            meal: 'Test Burger',
            price: 10.99,
            img: 'test-burger.png',
          },
          count: 2,
        })
      );
      
      store.dispatch(
        addToCart({
          product: {
            id: '2',
            meal: 'Test Pizza',
            price: 15.99,
            img: 'test-pizza.png',
          },
          count: 3,
        })
      );
    });
    
    await waitFor(() => {
      const cartBadge = screen.getByText('5');
      expect(cartBadge).toBeInTheDocument();
    });
  });

  it('displays login link when user is not authenticated', () => {
    renderWithRedux(<Header />);
    
    const loginLink = screen.getByText('Login');
    expect(loginLink).toBeInTheDocument();
    expect(screen.queryByText('Logout')).not.toBeInTheDocument();
  });

  it('displays logout button when user is authenticated', () => {
    renderWithRedux(<Header />, true);
    
    const logoutButton = screen.getByText('Logout');
    expect(logoutButton).toBeInTheDocument();
    expect(screen.queryByText('Login')).not.toBeInTheDocument();
  });
}); 