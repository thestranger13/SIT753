// imports the function
const { getCollection } = require('../startServer');

// function to find the vehiclenumber from database
exports.findVehicle = async (vehicleNumber) => {
    const collection = getCollection('vehicles');
    return await collection.findOne({ vehicleNumber: vehicleNumber });
};

// function to insert the vehicle number 
exports.saveVehicle = async (vehicleNumber) => {
    const collection = getCollection('vehicles');
    return await collection.insertOne({ vehicleNumber });
};

// function to retrieve all vehicle numbers in the database
exports.getAllVehicles = async () => {
    const collection = getCollection('vehicles');
    return await collection.find({}).toArray();
};

// export the functions to allow it to be reused  
// module.exports = { findVehicle, saveVehicle, getAllVehicles };