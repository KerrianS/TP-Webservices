import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.tsx';
import './login.css';
import ButtonComponent from '../../components/Button/ButtonComponent.tsx';
import GoogleButtonComponent from '../../components/Button/GoogleButtonComponent.tsx';
import TextFieldComponent from '../../components/TextField/TextFieldComponent.tsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import keycloak from '../../services/keycloak';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent | React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    toast.info("Seule la connexion avec Google est disponible pour le moment !", {
      position: "top-center",
      autoClose: 3000
    });
    
    setTimeout(() => {
      window.location.href = 'http://localhost:3001/auth/google';
    }, 3000);
  };

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:3001/auth/google';
  };

  const handleKeycloakLogin = () => {
    // keycloak.login();
  };

  return (
    <>
      <div className="login-background">
        <div className="login-card">
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
            Se connecter avec Keycloak
          </ButtonComponent>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;