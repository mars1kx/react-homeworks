import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartState, CartItem } from '../types';


const getInitialCartItems = (): CartItem[] => {
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
};

const initialState: CartState = {
  items: getInitialCartItems(),
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<{ product: CartItem['product']; count: number }>) => {
      const { product, count } = action.payload;
      const existingItemIndex = state.items.findIndex(
        (item) => item.product.id === product.id
      );

      if (existingItemIndex >= 0) {
        state.items[existingItemIndex].count += count;
      } else {
        state.items.push({ product, count });
      }

      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      state.items = state.items.filter((item) => item.product.id !== productId);
      
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
      
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },
    setCartItems: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
      
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    }
  },
});

export const { addToCart, removeFromCart, clearCart, setCartItems } = cartSlice.actions;

export const selectCartItems = (state: { cart: CartState }) => state.cart.items;
export const selectCartItemsCount = (state: { cart: CartState }) => 
  state.cart.items.reduce((total, item) => total + item.count, 0);
export const selectCartTotal = (state: { cart: CartState }) => 
  state.cart.items.reduce((total, item) => total + item.product.price * item.count, 0);

export default cartSlice.reducer; 