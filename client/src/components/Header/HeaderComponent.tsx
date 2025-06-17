import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
        <Link to="/" className="nav-brand">OpomlyTravel</Link>

        <div className={`nav-items ${isMenuOpen ? 'active' : ''}`}>
          {isAuthenticated && user ? (
            <>
              <Link to="/" className="nav-link">Accueil</Link>
              <Link to="/myTrip" className="nav-link">Mes voyages</Link>
              <div className="user-info">
                <strong>Bienvenue {user.name}</strong>
              </div>
              <ButtonComponent className="nav-button" onClick={logout}>
                Déconnexion
              </ButtonComponent>
            </>
          ) : (
            <Link to="/login" className="nav-link">Connexion</Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default HeaderComponent;