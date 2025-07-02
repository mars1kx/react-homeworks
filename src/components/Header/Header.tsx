import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Header.css'
import logoSvg from '../../assets/Logo.svg'
import cartSvg from '../../assets/Cart.svg'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { logoutUser } from '../../store/slices/authSlice'
import { selectCartItemsCount } from '../../store/slices/cartSlice'
import logger from '../../utils/logger'
import ThemeToggle from '../ThemeToggle/ThemeToggle'

const Header: React.FC = () => {
  const cartCount = useAppSelector(selectCartItemsCount);
  const { currentUser } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async (): Promise<void> => {
    logger.info('Logout button clicked')
    dispatch(logoutUser());
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo-container">
          <Link to="/">
            <img src={logoSvg} alt="Logo" className="logo-icon" />
          </Link>
        </div>
        
        <div className="navigation-cart-container">
          <nav className="nav-menu">
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/menu">Menu</Link></li>
              <li><Link to="#company">Company</Link></li>
              {currentUser ? (
                <li>
                  <button className="logout-button" onClick={handleLogout}>Logout</button>
                </li>
              ) : (
                <li><Link to="/login">Login</Link></li>
              )}
            </ul>
          </nav>
          
          <div className="cart-container">
            <ThemeToggle />
            <button className="cart-button" onClick={() => navigate('/order')}>
              <img src={cartSvg} alt="Cart" className="cart-icon" />
              <div className="cart-badge">{cartCount}</div>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header 