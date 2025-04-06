import './Footer.css'
import Logo from '../assets/Logo.svg'
import InstagramIcon from '../assets/social-instagram.svg'
import TwitterIcon from '../assets/social-twitter.svg'
import YoutubeIcon from '../assets/social-youtube.svg'

function Footer() {
  return (
    <div className="footer-wrapper">
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-column footer-logo-column">
            <div className="logo-container">
              <img src={Logo} alt="Logo" className="logo-icon" />
            </div>
            <p className="tagline">Takeaway & Delivery template<br />for small - medium businesses.</p>
          </div>

          <div className="footer-columns-container">
            <div className="footer-column">
              <p className="footer-column-titles">COMPANY</p>
              <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#order">Order</a></li>
                <li><a href="#faq">FAQ</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <p className="footer-column-titles">TEMPLATE</p>
              <ul>
                <li><a href="#style">Style Guide</a></li>
                <li><a href="#changelog">Changelog</a></li>
                <li><a href="#licence">Licence</a></li>
                <li><a href="#webflow">Webflow University</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <p className="footer-column-titles">FLOWBASE</p>
              <ul>
                <li><a href="#cloneables">More Cloneables</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-credits">
            <p>Built by <a href="#flowbase" className="highlight">Flowbase</a>. Powered by  <a href="#webflow" className="highlight">Webflow</a></p>
          </div>
          <div className="footer-social">
            <a href="#instagram" className="social-icon">
              <img src={InstagramIcon} alt="Instagram" />
            </a>
            <a href="#twitter" className="social-icon">
              <img src={TwitterIcon} alt="Twitter" />
            </a>
            <a href="#youtube" className="social-icon">
              <img src={YoutubeIcon} alt="YouTube" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer
