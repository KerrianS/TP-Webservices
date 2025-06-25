import express from 'express';
import { getTrips } from '../controllers/trips.controller.js';
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
router.get('/', getTrips);

export default router;
