import { useState, useEffect } from "react";
import { getOrdersApi } from "../__mocks__/api";
import { useFetch } from "./useFetch";

export const useCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]);

  const { url, options } = getOrdersApi();
  const { data } = useFetch(url, options);

  useEffect(() => {
    if (data) {
      setOrders(data);
    }
  }, [data]);

  useEffect(() => {
    window.addEventListener("add-to-cart", handleAddToCartEvent);

    return () => {
      window.removeEventListener("add-to-cart", handleAddToCartEvent);
    };
  }, []);

  const handleAddToCartEvent = (event) => {
    const { product, count } = event.detail;
    addToCart(product, count);
  };

  const addToCart = (product, count) => {
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

  const getCartItemsCount = () => {
    return cartItems.reduce((total, item) => total + item.count, 0);
  };

  const getCartTotal = () => {
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
