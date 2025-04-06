import './Header.css'
import logoSvg from '../assets/logo.svg'
import cartSvg from '../assets/cart.svg'

function Header() {
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
              <div className="cart-badge">0</div>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header 