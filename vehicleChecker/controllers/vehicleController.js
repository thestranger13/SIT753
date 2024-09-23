// imports the models 
const vehicleModel = require('../models/vehicleModel');

// handling the vehicle check
exports.checkVehicle = async (req, res) => {
    const vehicleNumber = req.query.vehicle;
    console.log(`Checking vehicle number: ${vehicleNumber}`);


    if (!/^\d{6}$/.test(vehicleNumber)) {
        return res.status(400).json({ valid: false, message: "Hey Hey! Invalid vehicle number format?!?!" });
    }

    try {
        const vehicle = await vehicleModel.findVehicle(vehicleNumber);
        if (vehicle) {
            res.status(200).json({ valid: true, message: "VALID!" });
        } else {
            await vehicleModel.saveVehicle(vehicleNumber);
            res.status(200).json({ valid: false, message: "VEHICLE NOT IN DATABASE - entry saved" });
        }
    } catch (error) {
        console.error("Error querying/saving to database:", error);
        res.status(500).json({ valid: false, message: "Internal server error" });
    }
};

// handling the retrieval of all saved vehicles 
exports.getSavedVehicles = async (req, res) => {
    try {
        const vehicles = await vehicleModel.getAllVehicles();
        res.status(200).json(vehicles);
    } catch (error) {
        console.error("Error fetching saved vehicles:", error);
        res.status(500).json({ valid: false, message: "Error fetching saved vehicles" });
    }
};