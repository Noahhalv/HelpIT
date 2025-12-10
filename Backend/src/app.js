import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import ticketRoutes from './v1.0.0/routes/ticketRoutes.js';

const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(cors());

// Setup routes | localhost:3002/api/v1.0.0/tickets
app.use('/api/v1.0.0/tickets', ticketRoutes)

app.listen(3002, () => {
    console.log('Server is running on http://localhost:3002/api/v1.0.0/tickets');
})