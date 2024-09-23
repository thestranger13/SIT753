const express = require('express');
const vehicleController = require('../controllers/vehicleController');

const router = express.Router();

// Route for checking vehicle
router.get('/', vehicleController.checkVehicle);

// Route to display the saved vehicles
router.get('/saved', vehicleController.getSavedVehicles);

module.exports = router;