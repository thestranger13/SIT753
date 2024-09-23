const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://camilleangshujie:MEHcjjRXuvYNsOlC@thestranger13.lch1ysu.mongodb.net/";
// const client = new MongoClient(uri);
let client;
let db;

// reference to the database in mongodb 
// let collection;

// establish the connection with the database with error handling 
async function connectToDatabase() {
    if (!client) {
        client = new MongoClient(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            ssl: true,
            tlsAllowInvalidCertificates: true
        });
        try {
            await client.connect();
            db = client.db("vehicleChecker");
            console.log("Connected to MongoDB");
        } catch (ex) {
            console.error("Error connecting to MongoDB:", ex);
            throw ex;
        }
    }
    return db;
}

function getCollection(collectionName) {
    if (!db) {
        throw new Error("Database not connected. Call connectToDatabase() first.");
    }
    return db.collection(collectionName);
}

async function closeConnection() {
    if (client) {
        await client.close();
        client = null;
        db = null;
        console.log("Database connection closed");
    }
}

// export the functions to allow it to be reused  
module.exports = { connectToDatabase, getCollection, closeConnection };

