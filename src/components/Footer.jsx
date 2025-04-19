import './Footer.css'
import Logo from '../assets/Logo.svg'
import InstagramIcon from '../assets/social-instagram.svg'
import TwitterIcon from '../assets/social-twitter.svg'
import YoutubeIcon from '../assets/social-youtube.svg'

const footerConfig = {
  columns: [
    {
      title: 'COMPANY',
      links: [
        { title: 'Home', url: '#home' },
        { title: 'Order', url: '#order' },
        { title: 'FAQ', url: '#faq' },
        { title: 'Contact', url: '#contact' }
      ]
    },
    {
      title: 'TEMPLATE',
      links: [
        { title: 'Style Guide', url: '#style' },
        { title: 'Changelog', url: '#changelog' },
        { title: 'Licence', url: '#licence' },
        { title: 'Webflow University', url: '#webflow' }
      ]
    },
    {
      title: 'FLOWBASE',
      links: [
        { title: 'More Cloneables', url: '#cloneables' }
      ]
    }
  ],
  socialLinks: [
    { icon: InstagramIcon, url: '#instagram', alt: 'Instagram' },
    { icon: TwitterIcon, url: '#twitter', alt: 'Twitter' },
    { icon: YoutubeIcon, url: '#youtube', alt: 'YouTube' }
  ]
};

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
            {footerConfig.columns.map((column, index) => (
              <div key={index} className="footer-column">
                <p className="footer-column-titles">{column.title}</p>
                <ul>
                  {column.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a href={link.url}>{link.title}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-credits">
            <p>Built by <a href="#flowbase" className="highlight">Flowbase</a>. Powered by  <a href="#webflow" className="highlight">Webflow</a></p>
          </div>
          <div className="footer-social">
            {footerConfig.socialLinks.map((social, index) => (
              <a key={index} href={social.url} className="social-icon">
                <img src={social.icon} alt={social.alt} />
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer
