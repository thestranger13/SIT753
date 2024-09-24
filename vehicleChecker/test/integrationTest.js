const request = require('supertest');
const { expect } = require('chai');
const { app, server } = require('../server');  // Import the server to close later
const { connectToDatabase, closeConnection } = require('../startServer');

console.log('Starting Vehicle Checker API tests');

// Integration test 
describe('Vehicle Checker API', function() {
    this.timeout(15000);  // Increased timeout to avoid premature test termination

    before(async function() {
        process.env.PORT = 4000;  // Use a different port for tests
        console.log('Connecting to database...');
        try {
            await connectToDatabase();
            await new Promise(resolve => setTimeout(resolve, 1000)); // Slight delay to ensure connection is stable
            console.log('Connected to database');
        } catch (error) {
            console.error('Failed to connect to database:', error);
            throw error;
        }
    });

    after(async function() {
        console.log('Closing database connection...');
        try {
            await new Promise(resolve => setTimeout(resolve, 500)); // Delay to ensure all operations complete
            await closeConnection();
            console.log('Database connection closed');
        } catch (error) {
            console.error('Failed to close database connection:', error);
        }

        // Close the server after all tests are done
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
    });

    // Test (a) - validate that API correctly identifies a valid vehicle number
    it('should return valid response for a valid vehicle number', async function() {
        console.log('Running test (a)');
        const validVehicleNumber = '131724';
        const response = await request(app)
            .get(`/checker?vehicle=${validVehicleNumber}`);

        expect(response.status).to.equal(200);
        expect(response.body.valid).to.be.true;
        expect(response.body.message).to.equal('VALID!');
        console.log('Test (a) completed');
    });

    // Test (b) - validate that API correctly identifies vehicle number with incorrect format 
    it('should return invalid response for a vehicle number with incorrect format', async function() {
        console.log('Running test (b)');
        const invalidVehicleNumber = 'abc999';
        const response = await request(app)
            .get(`/checker?vehicle=${invalidVehicleNumber}`);
    
        expect(response.status).to.equal(400);
        expect(response.body.valid).to.be.false;
        expect(response.body.message).to.equal('Hey Hey! Invalid vehicle number format?!?!');
        console.log('Test (b) completed');
    });

    // Test (c) - validate that API retrieves a list of saved vehicles
    it('should return saved vehicles', async function() {
        console.log('Running test (c)');
        const response = await request(app)
            .get('/checker/saved');

        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('array');
        console.log('Test (c) completed');
    });
});

console.log('All tests defined. About to execute!');
