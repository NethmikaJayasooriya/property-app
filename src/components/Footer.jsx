import { FaEnvelope, FaFacebook, FaInstagram } from 'react-icons/fa';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__content">
        
        {/* Brand / Info */}
        <div className="footer__section">
          <h3 className="footer__brand-title">Estate Agent App</h3>
          <p className="footer__subtitle">
            Find your dream home with Us. 
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer__section">
            <h4 className="footer__heading">Quick Links</h4>
            <ul className="footer__list">
                <li className="footer__list-item"><a href="/" className="footer__link">Search Properties</a></li>
                <li className="footer__list-item"><a href="#" className="footer__link">About Us</a></li>
                <li className="footer__list-item"><a href="#" className="footer__link">Privacy Policy</a></li>
            </ul>
        </div>

        {/* Contact / Socials */}
        <div className="footer__section">
            <h4 className="footer__heading">Connect</h4>
            <div className="footer__socials">
                {/*Icons: Facebook, Instagram, Mail */}
                <a href="#" className="footer__social-icon"><FaFacebook /></a>
                <a href="#" className="footer__social-icon"><FaInstagram /></a>
                <a href="#" className="footer__social-icon"><FaEnvelope /></a>
            </div>
            <p className="footer__copyright">
                &copy; {new Date().getFullYear()} Estate Agent App. All rights reserved.
            </p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;