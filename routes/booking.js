import express from 'express';
import { auth } from '../midelwares/user.auth.js';
import Booking from '../models/booking.model.js';

const router = express.Router();


router.post('/', auth, async (req, res) => {
  try {
    const { car, startAt, endAt, totalPrice } = req.body;
    const booking = new Booking({
      user: req.user._id,
      car,
      startAt,
      endAt,
      totalPrice
    });
    await booking.save();
    res.status(201).json({
      success: true,
      message: 'Booking successfully created!',
      booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error.message
    });
  }
});


router.get('/', auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).populate('car');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
