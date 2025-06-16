import React, { useState, useEffect } from 'react';
import './Header.css';

interface HeaderProps {
  isAuthenticated?: boolean;
}

const HeaderComponent: React.FC<HeaderProps> = ({ isAuthenticated = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    console.log('Déconnexion...');
  };

  return (
    <header className={isScrolled ? 'scrolled' : ''}>
      <nav>
        <div className="logo">
          <a href="/">OpomlyTravel</a>
        </div>

        {/* Menu mobile */}
        <button 
          className="menu-button" 
          onClick={toggleMenu} 
          aria-label="Menu"
        >
          <span className="menu-icon"></span>
        </button>

        {/* Navigation desktop */}
        <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <a href="/" className="nav-link">Accueil</a>
          <a href="/models3D" className="nav-link">Nos voyages</a>
          {isAuthenticated ? (
            <>
              <a href="/profile" className="nav-link">Profil</a>
              <button className="nav-button" onClick={handleLogout}>
                Déconnexion
              </button>
            </>
          ) : (
            <a href="/login" className="nav-link">Connexion</a>
          )}
        </div>
      </nav>
    </header>
  );
};

export default HeaderComponent;