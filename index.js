import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import userRoutes from './routes/users.js';
import carRoutes from './routes/cars.js';
import bookingRoutes from './routes/booking.js';

const app = express();
app.use(cors());
app.use(express.json());


mongoose.connect(process.env.mongo_uri)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err.message));


app.use("/api/users", userRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/bookings', bookingRoutes);


app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
