import { useState, useEffect } from 'react'
import { fetchOrders } from '../../__mocks__/api'

const useCartEvents = () => {
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrdersData();
    window.addEventListener('add-to-cart', handleAddToCartEvent);
    
    return () => {
      window.removeEventListener('add-to-cart', handleAddToCartEvent);
    };
  }, []);

  const handleAddToCartEvent = (event) => {
    const { product, count } = event.detail;
    addToCart(product, count);
  }

  const addToCart = (product, count) => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(item => item.product.id === product.id);
      
      if (existingItemIndex >= 0) {
        const updatedCartItems = [...prevItems];
        updatedCartItems[existingItemIndex] = {
          product,
          count: prevItems[existingItemIndex].count + count
        };
        return updatedCartItems;
      } else {
        return [...prevItems, { product, count }];
      }
    });
  }

  const getCartItemsCount = () => {
    return cartItems.reduce((total, item) => total + item.count, 0);
  }

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.product.price * item.count), 0);
  }

  const fetchOrdersData = async () => {
    try {
      const ordersData = await fetchOrders();
      setOrders(ordersData);
    } catch (error) {
      console.error('Ошибка при загрузке заказов:', error);
    }
  }

  return {
    cartItems,
    orders,
    getCartItemsCount,
    getCartTotal
  };
}

export default useCartEvents; 