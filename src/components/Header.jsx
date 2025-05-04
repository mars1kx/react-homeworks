import React, { Component } from 'react'
import './Header.css'
import logoSvg from '../assets/Logo.svg'
import cartSvg from '../assets/Cart.svg'
import { fetchOrders } from '../__mocks__/api'

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItems: [],
      orders: []
    };
  }

  componentDidMount() {
    this.fetchOrders();
    window.addEventListener('add-to-cart', this.handleAddToCartEvent);
  }

  componentWillUnmount() {
    window.removeEventListener('add-to-cart', this.handleAddToCartEvent);
  }

  handleAddToCartEvent = (event) => {
    const { product, count } = event.detail;
    this.addToCart(product, count);
  }

  addToCart = (product, count) => {
    this.setState(prevState => {
      const existingItemIndex = prevState.cartItems.findIndex(item => item.product.id === product.id);
      
      if (existingItemIndex >= 0) {
        const updatedCartItems = [...prevState.cartItems];
        updatedCartItems[existingItemIndex].count += count;
        return { cartItems: updatedCartItems };
      } else {
        return {
          cartItems: [...prevState.cartItems, { product, count }]
        };
      }
    });
  }

  getCartItemsCount = () => {
    return this.state.cartItems.reduce((total, item) => total + item.count, 0);
  }

  getCartTotal = () => {
    return this.state.cartItems.reduce((total, item) => total + (item.product.price * item.count), 0);
  }

  fetchOrders = async () => {
    try {
      const orders = await fetchOrders();
      this.setState({ orders });
    } catch (error) {
      console.error('Ошибка при загрузке заказов:', error);
    }
  }

  render() {
    const cartCount = this.getCartItemsCount();
    const cartTotal = this.getCartTotal().toFixed(2);

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
}

export default Header 