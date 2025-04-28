import React, { useState, useEffect } from 'react'
import './Header.css'
import logoSvg from '../assets/Logo.svg'
import cartSvg from '../assets/Cart.svg'
import { fetchOrders } from '../__mocks__/api'

const Header = () => {
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrdersData();
    window.addEventListener('add-to-cart', handleAddToCartEvent);
    
    // Очистка при размонтировании
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
        // Создаем новый массив для обновления состояния
        const updatedCartItems = [...prevItems];
        // Суммируем количество с существующим вместо замены
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

  const cartCount = getCartItemsCount();
  const cartTotal = getCartTotal().toFixed(2);

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo-container">
          <img src={logoSvg} alt="Logo" className="logo-icon" />
        </div>
        
        <div className="navigation-cart-container">
          <nav className="nav-menu">
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#menu">Menu</a></li>
              <li><a href="#company">Company</a></li>
              <li><a href="#login">Login</a></li>
            </ul>
          </nav>
          
          <div className="cart-container">
            <button className="cart-button">
              <img src={cartSvg} alt="Cart" className="cart-icon" />
              <div className="cart-badge">{cartCount}</div>
              {cartCount > 0 && (
                <div className="cart-total">$ {cartTotal} USD</div>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header 