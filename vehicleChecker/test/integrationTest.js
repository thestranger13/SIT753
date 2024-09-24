const request = require('supertest');
const { expect } = require('chai');
const { app, server } = require('../server');  // Import the app and server
const { connectToDatabase, closeConnection } = require('../startServer');

console.log('Starting Vehicle Checker API tests');

describe('Vehicle Checker API', function() {
    this.timeout(15000);  // Increased timeout to avoid premature test termination

    before(async function() {
        // Use a different port for tests to avoid conflicts with production server
        process.env.PORT = 4000;
        console.log('Connecting to database...');
        try {
            await connectToDatabase(); // Attempt to connect to the database
            await new Promise(resolve => setTimeout(resolve, 1000)); // Short delay to stabilize the connection
            console.log('Connected to database');
        } catch (error) {
            console.error('Failed to connect to database:', error);
            throw error; // Throw error to ensure the test suite fails early if database connection fails
        }
    });

    after(async function() {
        console.log('Closing database connection...');
        try {
            await new Promise(resolve => setTimeout(resolve, 500)); // Short delay to allow all database operations to finish
            await closeConnection(); // Close database connection
            console.log('Database connection closed');
        } catch (error) {
            console.error('Failed to close database connection:', error);
        }

        // Close the server after all tests are done, if it's running
        if (server && server.listening) {
            console.log('Closing server...');
            await new Promise((resolve, reject) => {
                server.close((err) => {
                    if (err) {
                        console.error('Error closing server:', err);
                        return reject(err);
                    }
                    console.log('Server closed');
                    resolve();
                });
            });
        } else {
            console.log('Server was not running');
        }
    });

    // Test (a) - validate valid vehicle number
    it('should return valid response for a valid vehicle number', async function() {
        console.log('Running test (a)');
        const validVehicleNumber = '131724';
        const response = await request(app)
            .get(`/checker?vehicle=${validVehicleNumber}`);

        expect(response.status).to.equal(200);  // Verify HTTP status code
        expect(response.body.valid).to.be.true; // Verify if the vehicle is valid
        expect(response.body.message).to.equal('VALID!'); // Verify message
        console.log('Test (a) completed');
    });

    // Test (b) - validate that API correctly identifies vehicle number with incorrect format
    it('should return invalid response for a vehicle number with incorrect format', async function() {
        console.log('Running test (b)');
        const invalidVehicleNumber = 'abc999';
        const response = await request(app)
            .get(`/checker?vehicle=${invalidVehicleNumber}`);
    
        expect(response.status).to.equal(400);  // Expect 400 Bad Request
        expect(response.body.valid).to.be.false; // Expect valid to be false
        expect(response.body.message).to.equal('Hey Hey! Invalid vehicle number format?!?!');
        console.log('Test (b) completed');
    });

    // Test (c) - validate that API retrieves a list of saved vehicles
    it('should return saved vehicles', async function() {
        console.log('Running test (c)');
        const response = await request(app)
            .get('/checker/saved');

        expect(response.status).to.equal(200);  // Expect 200 OK
        expect(response.body).to.be.an('array'); // Expect the response to be an array
        expect(response.body.length).to.be.at.least(1); // Optionally check that at least one vehicle is returned
        console.log('Test (c) completed');
    });
});

console.log('All tests defined. About to execute!');
