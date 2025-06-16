import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext.tsx';
import './Header.css';
import ButtonComponent from '../Button/ButtonComponent.tsx';

const HeaderComponent: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

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

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <nav className="nav">
        <a href="/" className="nav-brand">OpomlyTravel</a>

        <div className={`nav-items ${isMenuOpen ? 'active' : ''}`}>
          <a href="/" className="nav-link">Accueil</a>
          <a href="/voyages" className="nav-link">Nos voyages</a>
          <div className="nav-items">
            {isAuthenticated && user ? (
              <>
                <div className="user-info">
                  <strong>Bienvenue {user.firstName} {user.lastName}</strong>
                </div>
                <ButtonComponent className="nav-button" onClick={logout}>
                  Déconnexion
                </ButtonComponent>
              </>
            ) : (
              <a href="/login" className="nav-link">Connexion</a>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default HeaderComponent;