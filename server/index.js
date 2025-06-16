import express from 'express';
import js2xmlparser from 'js2xmlparser';
import cors from 'cors';  // Add this import

const app = express();
const port = 3001;

// Enable CORS
app.use(cors());

// Exemple de données statiques
const vol = {
    compagnie: 'Air France',
    numero: 'AF1234',
    place: '12A',
    prix: 199.99,
    date: '2025-07-01T10:00:00Z'
};

// Route pour obtenir un vol en JSON ou XML
app.get('/compagnies/:compagnieId/vols/:volId', (req, res) => {
    const accept = req.headers['accept'];
    if (accept && accept.includes('application/xml')) {
        res.set('Content-Type', 'application/xml');
        res.send(js2xmlparser.parse('vol', vol));
    } else {
        res.json(vol);
    }
});

// Autres routes RESTful (exemples)
app.get('/compagnies', (req, res) => {
    res.json([{ id: 'AF', nom: 'Air France' }, { id: 'LH', nom: 'Lufthansa' }]);
});

app.get('/compagnies/:compagnieId/vols', (req, res) => {
    res.json([vol]);
});

app.get('/compagnies/:compagnieId/vols/:volId/places', (req, res) => {
    res.json([{ id: '12A', disponible: true }, { id: '12B', disponible: false }]);
});

app.get('/compagnies/:compagnieId/vols/:volId/date', (req, res) => {
    res.json({ date: vol.date });
});

app.listen(port, () => {
    console.log(`API REST statique sur http://localhost:${port}`);
});
