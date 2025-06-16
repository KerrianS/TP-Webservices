import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [vol, setVol] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/compagnies/AF/vols/AF1234')
      .then(res => res.json())
      .then(data => setVol(data));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <h1>Réservation de Vol</h1>
      {vol ? (
        <div>
          <p><strong>Compagnie :</strong> {vol.compagnie}</p>
          <p><strong>Numéro :</strong> {vol.numero}</p>
          <p><strong>Place :</strong> {vol.place}</p>
          <p><strong>Prix :</strong> {vol.prix} €</p>
          <p><strong>Date :</strong> {new Date(vol.date).toLocaleString()}</p>
        </div>
      ) : (
        <p>Chargement...</p>
      )}
    </div>
  );
}

export default App;
