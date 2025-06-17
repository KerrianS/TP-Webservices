import React from 'react';
import './home.css';

const dreamDestinations = [
  {
    name: 'Maldives',
    img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    desc: 'Lagons turquoise et plages de sable blanc.'
  },
  {
    name: 'Santorini',
    img: 'https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?auto=format&fit=crop&w=800&q=80',
    desc: 'Couchers de soleil magiques sur la mer Égée.'
  },
  {
    name: 'Banff',
    img: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80',
    desc: 'Lacs émeraude et montagnes majestueuses.'
  },
  {
    name: 'Bora Bora',
    img: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=800&q=80',
    desc: 'Bungalows sur pilotis et eaux cristallines.'
  },
  {
    name: 'Kyoto',
    img: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&q=80',
    desc: 'Temples paisibles et cerisiers en fleurs.'
  },
  {
    name: 'Patagonie',
    img: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80',
    desc: 'Glaciers et paysages à couper le souffle.'
  },
  {
    name: 'Île de Pâques',
    img: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80',
    desc: 'Mystérieuses statues Moaï et paysages volcaniques.'
  },
  {
    name: 'Cap Town',
    img: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80',
    desc: 'Montagne de la Table et plages sauvages.'
  }
];

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <div className="hero-section dream-bg">
        <div className="hero-overlay" />
        <h1 className="hero-title">Voyagez vers vos rêves</h1>
        <p className="hero-subtitle">Des paysages à couper le souffle, des souvenirs inoubliables.<br/>Explorez le monde avec OpomlyTravel.</p>
        <button className="cta-button hero-btn">Planifiez votre aventure</button>
      </div>

      <div className="dream-destinations-section">
        <h2>Destinations de rêve</h2>
        <div className="dream-destinations-grid">
          {dreamDestinations.map((dest, idx) => (
            <div className="dream-card" key={idx}>
              <img src={dest.img} alt={dest.name} />
              <div className="dream-card-info">
                <h4>{dest.name}</h4>
                <p>{dest.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;