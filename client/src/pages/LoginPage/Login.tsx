import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import ButtonComponent from '../../components/Button/ButtonComponent.tsx';
import GoogleButtonComponent from '../../components/Button/GoogleButtonComponent.tsx';
import TextFieldComponent from '../../components/TextField/TextFieldComponent.tsx';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent | React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      console.log('Login attempt with:', { email, password });
    } catch (e) {
      setError('Erreur lors de la connexion');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      // TODO: Implémenter la connexion Google
      console.log('Google login attempt');
    } catch (e) {
      setError('Erreur lors de la connexion avec Google');
    }
  };

  return (
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
          Pas encore de compte ? <a href="/signup">S'inscrire</a>
        </p>
      </div>
    </div>
  );
};

export default Login;