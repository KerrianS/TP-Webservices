import express from 'express';
const router = express.Router();

/**
 * @swagger
 * /api/trips:
 *   get:
 *     summary: Récupère la liste des voyages réservés (mock)
 *     tags: [Trips]
 *     responses:
 *       200:
 *         description: Liste des voyages réservés
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   destination:
 *                     type: string
 *                   date:
 *                     type: string
 *                     format: date
 *                   image:
 *                     type: string
 *                   description:
 *                     type: string
 */
// Route mock pour voyages réservés
router.get('/', (req, res) => {
    res.json([
        {
            id: 1,
            destination: 'Maldives',
            date: '2024-08-15',
            image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
            description: 'Séjour de rêve dans un bungalow sur l\'eau.'
        },
        {
            id: 2,
            destination: 'Kyoto',
            date: '2024-04-10',
            image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&q=80',
            description: 'Découverte des temples et des cerisiers en fleurs.'
        },
        {
            id: 3,
            destination: 'Patagonie',
            date: '2024-12-01',
            image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80',
            description: 'Aventure au cœur des glaciers et montagnes.'
        }
    ]);
});

export default router;
