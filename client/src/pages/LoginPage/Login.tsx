import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.tsx';
import './login.css';
import ButtonComponent from '../../components/Button/ButtonComponent.tsx';
import GoogleButtonComponent from '../../components/Button/GoogleButtonComponent.tsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import opomlyLogo from '../../assets/opomlyTravel.png';
import keycloakLogo from '../../assets/keycloak.png';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { isAuthenticated, loginWithKeycloak } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:3001/api/google/auth/google';
  };

  const handleKeycloakLogin = () => {
    loginWithKeycloak();
  };

  return (
    <>
      <div className="login-background">
        <div className="login-card">
          <img src={opomlyLogo} alt="OpomlyTravel Logo" className="login-logo" />
          <h1 className="form-title">Connexion</h1>
          {error && <div className="form-error">{error}</div>}
          
          <GoogleButtonComponent onClick={handleGoogleLogin}>
            Se connecter avec Google
          </GoogleButtonComponent>
          
          <div className="separator">
            <span>ou</span>
          </div>

          <ButtonComponent
            color="primary"
            variant="raised"
            onClick={handleKeycloakLogin}
            className="login-btn"
          >
            <img src={keycloakLogo} alt="Keycloak Logo" style={{ width: '80px' }} />
            Se connecter avec Keycloak
          </ButtonComponent>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;