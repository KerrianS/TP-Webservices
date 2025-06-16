import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.tsx';
import Header from './components/Header/HeaderComponent.tsx';
import Footer from './components/Footer/FooterComponent.tsx';
import Home from './pages/HomePage/Home.tsx';
import Login from './pages/LoginPage/Login.tsx';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <AuthProvider>
      <div className="App">
        <Header isAuthenticated={isAuthenticated} />
        
        <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login onLoginSuccess={() => setIsAuthenticated(true)} />} />
              <Route path="/services" element={<div>Services Page</div>} />
              <Route path="/about" element={<div>À propos</div>} />
              <Route path="/contact" element={<div>Contact</div>} />
            </Routes>
        </main>

        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
