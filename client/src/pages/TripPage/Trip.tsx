import React, { useEffect, useState } from 'react';
import './trip.css';

interface Trip {
  id: number;
  destination: string;
  date: string;
  image: string;
  description: string;
}

const Trip: React.FC = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/api/trips')
      .then(res => res.json())
      .then(data => {
        setTrips(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="trip-container">
      <h1>Mes voyages réservés</h1>
      {loading ? (
        <div className="trip-loading">Chargement...</div>
      ) : trips.length === 0 ? (
        <div className="trip-empty">Aucun voyage réservé pour le moment.</div>
      ) : (
        <div className="trip-grid">
          {trips.map(trip => (
            <div className="trip-card" key={trip.id}>
              <img src={trip.image} alt={trip.destination} className="trip-img" />
              <div className="trip-info">
                <h2>{trip.destination}</h2>
                <p className="trip-date">Départ le {new Date(trip.date).toLocaleDateString()}</p>
                <p>{trip.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Trip;
