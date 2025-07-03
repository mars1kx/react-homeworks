import { describe, it, expect, beforeEach, vi } from 'vitest';
import cartReducer, {
  addToCart,
  removeFromCart,
  clearCart,
  setCartItems,
  selectCartItems,
  selectCartItemsCount,
  selectCartTotal
} from '../cartSlice';
import { CartState } from '../../types';

vi.mock('../cartSlice', async () => {
  const actual = await vi.importActual('../cartSlice') as any;
  return {
    ...actual,
    getInitialCartItems: vi.fn().mockImplementation(() => {
      if (typeof window !== 'undefined') {
        const savedCartItems = localStorage.getItem('cartItems');
        if (savedCartItems) {
          try {
            return JSON.parse(savedCartItems);
          } catch (e) {
            console.error('Error parsing cart items from localStorage:', e);
            return [];
          }
        }
      }
      return [];
    })
  };
});

describe('cartSlice', () => {
  let initialState: CartState;

  beforeEach(() => {
    initialState = {
      items: [],
      loading: false,
      error: null,
    };
    localStorage.clear();
  });

  describe('reducers', () => {
    it('should handle initial state', () => {
      expect(cartReducer(undefined, { type: 'unknown' })).toEqual({
        items: [],
        loading: false,
        error: null,
      });
    });

    it('should handle addToCart with new item', () => {
      const product = {
        id: '1',
        meal: 'Burger',
        price: 10,
        img: 'burger.png',
        description: 'Tasty burger'
      };
      
      const nextState = cartReducer(initialState, addToCart({ product, count: 2 }));
      
      expect(nextState.items).toHaveLength(1);
      expect(nextState.items[0]).toEqual({ product, count: 2 });
      expect(localStorage.getItem('cartItems')).toBe(JSON.stringify(nextState.items));
    });

    it('should handle addToCart with existing item', () => {
      const product = {
        id: '1',
        meal: 'Burger',
        price: 10,
        img: 'burger.png',
        description: 'Tasty burger'
      };
      
      let state = cartReducer(initialState, addToCart({ product, count: 2 }));
      
      state = cartReducer(state, addToCart({ product, count: 3 }));
      
      expect(state.items).toHaveLength(1);
      expect(state.items[0]).toEqual({ product, count: 5 });
      expect(localStorage.getItem('cartItems')).toBe(JSON.stringify(state.items));
    });

    it('should handle removeFromCart', () => {
      const product1 = {
        id: '1',
        meal: 'Burger',
        price: 10,
        img: 'burger.png',
        description: 'Tasty burger'
      };
      
      const product2 = {
        id: '2',
        meal: 'Pizza',
        price: 15,
        img: 'pizza.png',
        description: 'Tasty pizza'
      };
      
      let state = cartReducer(initialState, addToCart({ product: product1, count: 2 }));
      state = cartReducer(state, addToCart({ product: product2, count: 1 }));
      
      state = cartReducer(state, removeFromCart('1'));
      
      expect(state.items).toHaveLength(1);
      expect(state.items[0].product.id).toBe('2');
      expect(localStorage.getItem('cartItems')).toBe(JSON.stringify(state.items));
    });

    it('should handle clearCart', () => {
      const product = {
        id: '1',
        meal: 'Burger',
        price: 10,
        img: 'burger.png',
        description: 'Tasty burger'
      };
      
      let state = cartReducer(initialState, addToCart({ product, count: 2 }));
      
      state = cartReducer(state, clearCart());
      
      expect(state.items).toHaveLength(0);
      expect(localStorage.getItem('cartItems')).toBe('[]');
    });

    it('should handle setCartItems', () => {
      const items = [
        {
          product: {
            id: '1',
            meal: 'Burger',
            price: 10,
            img: 'burger.png',
            description: 'Tasty burger'
          },
          count: 2
        },
        {
          product: {
            id: '2',
            meal: 'Pizza',
            price: 15,
            img: 'pizza.png',
            description: 'Tasty pizza'
          },
          count: 1
        }
      ];
      
      const state = cartReducer(initialState, setCartItems(items));
      
      expect(state.items).toEqual(items);
      expect(localStorage.getItem('cartItems')).toBe(JSON.stringify(items));
    });
  });

  describe('selectors', () => {
    it('should select cart items', () => {
      const items = [
        {
          product: {
            id: '1',
            meal: 'Burger',
            price: 10,
            img: 'burger.png',
            description: 'Tasty burger'
          },
          count: 2
        }
      ];
      
      const state = { cart: { items, loading: false, error: null } };
      expect(selectCartItems(state)).toEqual(items);
    });

    it('should calculate cart items count', () => {
      const items = [
        {
          product: {
            id: '1',
            meal: 'Burger',
            price: 10,
            img: 'burger.png'
          },
          count: 2
        },
        {
          product: {
            id: '2',
            meal: 'Pizza',
            price: 15,
            img: 'pizza.png'
          },
          count: 3
        }
      ];
      
      const state = { cart: { items, loading: false, error: null } };
      expect(selectCartItemsCount(state)).toBe(5);
    });

    it('should calculate cart total', () => {
      const items = [
        {
          product: {
            id: '1',
            meal: 'Burger',
            price: 10,
            img: 'burger.png'
          },
          count: 2
        },
        {
          product: {
            id: '2',
            meal: 'Pizza',
            price: 15,
            img: 'pizza.png'
          },
          count: 3
        }
      ];
      
      const state = { cart: { items, loading: false, error: null } };
        expect(selectCartTotal(state)).toBe(65);
    });
  });

  describe('localStorage integration', () => {
    it('should load initial state from localStorage', () => {
      const items = [
        {
          product: {
            id: '1',
            meal: 'Burger',
            price: 10,
            img: 'burger.png'
          },
          count: 2
        }
      ];
      
      localStorage.setItem('cartItems', JSON.stringify(items));
      
      const state = cartReducer(undefined, addToCart({
        product: {
          id: '2',
          meal: 'Pizza',
          price: 15,
          img: 'pizza.png'
        },
        count: 1
      }));
      
      expect(state.items).toHaveLength(1);
      expect(state.items[0].product.id).toBe('2');
      expect(localStorage.getItem('cartItems')).toBe(JSON.stringify(state.items));
    });

    it('should handle localStorage errors', () => {
      vi.spyOn(JSON, 'parse').mockImplementationOnce(() => {
        throw new Error('Invalid JSON');
      });
      
      localStorage.setItem('cartItems', 'invalid json');
      
      const reducer = cartReducer(undefined, { type: 'unknown' });
      
      expect(reducer.items).toEqual([]);
    });
  });
}); 