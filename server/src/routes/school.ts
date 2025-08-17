import express from 'express';
import School from '../models/School.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticateToken);

// Get school settings
router.get('/', async (req, res) => {
  try {
    let school = await School.findOne();
    
    // If no school exists, create default one
    if (!school) {
      school = new School({
        logoUrl: 'https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&dpr=1',
        diseCode: '12345678',
        schoolName: 'Sample High School',
        establishedYear: 1990,
        circle: 'East Circle',
        village: 'Sample Village',
        postOffice: 'Sample Post Office',
        policeStation: 'Sample Police Station',
        district: 'Sample District',
        pin: '123456',
        place: 'Sample Place',
      });
      await school.save();
    }
    
    res.json(school);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Update school settings
router.put('/', async (req, res) => {
  try {
    let school = await School.findOne();
    
    if (!school) {
      school = new School(req.body);
    } else {
      Object.assign(school, req.body);
    }
    
    await school.save();
    res.json(school);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

export default router;