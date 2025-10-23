import express from 'express';
import { auth } from '../midelwares/user.auth.js'; 
import Car from '../models/car.model.js'; 

const router = express.Router(); 


router.get('/', async (req, res) => {
  try {
    
    const cars = await Car.find();
    res.status(200).json({
      success: true,
      message: 'All cars fetched successfully!',
      cars: cars
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get cars',
      error: error.message
    });
  }
});



router.post('/', auth, async (req, res) => {
  try {
   
    const { name, brand, price, image } = req.body;

  
    const car = new Car({
      name: name,
      brand: brand,
      price: price,
      image: image
    });

   
    await car.save();

   
    res.status(201).json({
      success: true,
      message: 'New car added successfully!',
      car: car
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to add car',
      error: error.message
    });
  }
});

export default router;
