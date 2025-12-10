import express from 'express';
import {
    getAllTickets,
    getSingleTicket,
    createTicket,
    updateTicket,
    deleteTicket
} from '../controllers/ticketController.js';

const router = express.Router();

// GET | www.localhost:3002/api/v1/Tickets
router.get('/', getAllTickets);

// GET | www.localhost:3002/api/v1/Tickets/:id
router.get('/:id', getSingleTicket);

// POST | www.localhost:3002/api/v1/Tickets
router.post('/', createTicket);

// PUT | www.localhost:3002/api/v1/Tickets/:id
router.put('/:id', updateTicket);

// DELETE | www.localhost:3002/api/v1/Tickets/:id
router.delete('/:id', deleteTicket);

export default router;