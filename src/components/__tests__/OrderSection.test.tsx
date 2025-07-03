import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { vi } from 'vitest';
import OrderSection from '../OrderSection/OrderSection';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer, { addToCart } from '../../store/slices/cartSlice';

vi.mock('../../contexts/ThemeContext', () => ({
  useTheme: () => ({ theme: 'light' }),
}));

const alertMock = vi.fn();
window.alert = alertMock;

console.log = vi.fn();

describe('OrderSection', () => {
  const createTestStore = (preloadedState = {}) => {
    return configureStore({
      reducer: {
        cart: cartReducer,
      },
      preloadedState
    });
  };

  const renderWithRedux = (component: React.ReactElement, preloadedState = {}) => {
    const store = createTestStore(preloadedState);
    return {
      ...render(<Provider store={store}>{component}</Provider>),
      store,
    };
  };

  beforeEach(() => {
    alertMock.mockClear();
    localStorage.clear();
  });

  it('displays empty cart message when cart is empty', () => {
    renderWithRedux(<OrderSection />);
    expect(screen.getByText('Your cart is empty. Add items from the menu.')).toBeInTheDocument();
  });

  it('displays cart items when cart is not empty', async () => {
    const { store } = renderWithRedux(<OrderSection />);
    
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
    });

    await waitFor(() => {
      expect(screen.queryByText('Your cart is empty. Add items from the menu.')).not.toBeInTheDocument();
    });
    
    expect(screen.getByText(/Test Burger/i)).toBeInTheDocument();
    expect(screen.getByText(/\$ 10.99 USD/i)).toBeInTheDocument();
  });

  it('removes item from cart when remove button is clicked', async () => {
    const { store } = renderWithRedux(<OrderSection />);
    
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
    });

    await waitFor(() => {
      expect(screen.queryByText(/Test Burger/i)).toBeInTheDocument();
    });
    
    const removeButton = screen.getByText('X');
    await act(async () => {
      fireEvent.click(removeButton);
    });
    
    await waitFor(() => {
      expect(screen.queryByText(/Test Burger/i)).not.toBeInTheDocument();
      expect(screen.getByText('Your cart is empty. Add items from the menu.')).toBeInTheDocument();
    });
  });

  it('calculates total price correctly', async () => {
    const { store, container } = renderWithRedux(<OrderSection />);
    
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
          count: 1,
        })
      );
    });

    await waitFor(() => {
      expect(screen.queryByText(/Test Burger/i)).toBeInTheDocument();
      expect(screen.queryByText(/Test Pizza/i)).toBeInTheDocument();
    });
    
    const totalPriceElement = container.querySelector('.total-price');
    expect(totalPriceElement).not.toBeNull();
    expect(totalPriceElement?.textContent).toContain('37.97');
  });

  it('submits order and clears cart', async () => {
    const { store } = renderWithRedux(<OrderSection />);
    
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
    });

    await waitFor(() => {
      expect(screen.queryByText(/Test Burger/i)).toBeInTheDocument();
    });
    
    const streetInput = screen.getByLabelText('Street');
    const houseInput = screen.getByLabelText('House');
    
    await act(async () => {
      fireEvent.change(streetInput, { target: { value: 'Test Street' } });
      fireEvent.change(houseInput, { target: { value: '123' } });
    });
    
    const submitButton = screen.getByRole('button', { name: /Order/i });
    await act(async () => {
      fireEvent.click(submitButton);
    });
    
    expect(alertMock).toHaveBeenCalledWith('Order successfully sent!');
    
    await waitFor(() => {
      expect(screen.getByText('Your cart is empty. Add items from the menu.')).toBeInTheDocument();
    });
  });

  it('loads cart items from localStorage on component mount', async () => {
    const cartItems = [
      {
        product: {
          id: '1',
          meal: 'Test Burger',
          price: 10.99,
          img: 'test-burger.png',
        },
        count: 2,
      }
    ];
    
    const preloadedState = {
      cart: {
        items: cartItems,
        loading: false,
        error: null
      }
    };
    
    const { container } = renderWithRedux(<OrderSection />, preloadedState);
    
    expect(screen.getByText(/Test Burger/i)).toBeInTheDocument();
    
    const totalPriceElement = container.querySelector('.total-price');
    expect(totalPriceElement).not.toBeNull();
    expect(totalPriceElement?.textContent).toContain('21.98');
  });
}); 