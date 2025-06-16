import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.tsx';
import './login.css';
import ButtonComponent from '../../components/Button/ButtonComponent.tsx';
import GoogleButtonComponent from '../../components/Button/GoogleButtonComponent.tsx';
import TextFieldComponent from '../../components/TextField/TextFieldComponent.tsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

          <form onSubmit={handleSubmit}>
            <TextFieldComponent
              variant="outlined"
              value={email}
              onChange={(value) => setEmail(value)}
              label="Email"
              type="email"
              required={true}
              className="login-input"
            />
            <TextFieldComponent
              variant="outlined"
              value={password}
              onChange={(value) => setPassword(value)}
              label="Mot de passe"
              type="password"
              required={true}
              className="login-input"
            />
            <ButtonComponent
              color="primary"
              variant="raised"
              onClick={handleSubmit}
              type="submit"
            >
              Se connecter
            </ButtonComponent>
          </form>
          <p className="form-link">
            Pas encore de compte ? Connecte toi avec Google !!!
          </p>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;