import React from 'react';
import './Footer.css';

const FooterComponent: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div className="footer-content">
        <div className="footer-section">
          <h3>OpomlyTravel</h3>
          <p>Votre partenaire de voyage de confiance</p>
        </div>
        
        <div className="footer-section">
          <h4>Navigation</h4>
          <ul>
            <li><a href="/">Accueil</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/about">À propos</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Contact</h4>
          <ul>
            <li>Email: contact@opomlytravel.com</li>
            <li>Tél: +33 1 23 45 67 89</li>
            <li>Adresse: 123 Rue du Voyage, 75000 Paris</li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Suivez-nous</h4>
          <div className="social-links">
            <a href="#" aria-label="LinkedIn">LinkedIn</a>
            <a href="#" aria-label="Twitter">Twitter</a>
            <a href="#" aria-label="Facebook">Facebook</a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {currentYear} OpomlyTravel. Tous droits réservés.</p>
      </div>
    </footer>
  );
};

export default FooterComponent;