import { useState, useEffect } from "react";
import { getOrdersApi } from "../__mocks__/api";
import { useFetch } from "./useFetch";

interface Product {
  id: string;
  name: string;
  price: number;
  image?: string;
  description?: string;
}

interface CartItem {
  product: Product;
  count: number;
}

interface Order {
  id: string;
  items: CartItem[];
  date: string;
  status: string;
  total: number;
}

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  const { url, options } = getOrdersApi();
  const { data } = useFetch<Order[]>(url, options);

  useEffect(() => {
    if (data) {
      setOrders(data);
    }
  }, [data]);

  useEffect(() => {
    window.addEventListener("add-to-cart", handleAddToCartEvent as EventListener);

    return () => {
      window.removeEventListener("add-to-cart", handleAddToCartEvent as EventListener);
    };
  }, []);

  interface AddToCartEvent extends CustomEvent {
    detail: {
      product: Product;
      count: number;
    };
  }

  const handleAddToCartEvent = (event: AddToCartEvent) => {
    const { product, count } = event.detail;
    addToCart(product, count);
  };

  const addToCart = (product: Product, count: number): void => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) => item.product.id === product.id
      );

      if (existingItemIndex >= 0) {
        const updatedCartItems = [...prevItems];
        updatedCartItems[existingItemIndex] = {
          product,
          count: prevItems[existingItemIndex].count + count,
        };
        return updatedCartItems;
      } else {
        return [...prevItems, { product, count }];
      }
    });
  };

  const getCartItemsCount = (): number => {
    return cartItems.reduce((total, item) => total + item.count, 0);
  };

  const getCartTotal = (): number => {
    return cartItems.reduce(
      (total, item) => total + item.product.price * item.count,
      0
    );
  };

  return {
    cartItems,
    orders,
    getCartItemsCount,
    getCartTotal,
  };
}; 