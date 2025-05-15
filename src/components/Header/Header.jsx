import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Header.css'
import logoSvg from '../../assets/Logo.svg'
import cartSvg from '../../assets/Cart.svg'
import { useCart } from '../../hooks'
import { useAuth } from '../../contexts/AuthContext'
import logger from '../../utils/logger'

const Header = () => {
  const { getCartItemsCount, getCartTotal } = useCart();
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  
  const cartCount = getCartItemsCount();
  const cartTotal = getCartTotal().toFixed(2);

  const handleLogout = async () => {
    logger.info('Logout button clicked')
    try {
      await logout();
      logger.info('Logout successful, navigating to home page')
      navigate('/');
    } catch (error) {
      logger.error('Logout error in Header component', error)
    }
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