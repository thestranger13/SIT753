const assert = require('assert');

// Unit Test - vehicle number validation

    describe('Vehicle Number Validation', () => {
        // test (a) to ensure that it only accepts 6 digits vehicle number
        it('should return true for a valid vehicle number with 6 digits', () => {
            const vehicleNumber = '131724';
            const isValid = /^\d{6}$/.test(vehicleNumber);
            assert.strictEqual(isValid, true);
        });

        // test (b) to ensure it rejects vehicle number less than 6 digits
        it('should return false for an invalid vehicle number (less than 6 digits)', () => {
            const vehicleNumber = '01015';
            const isValid = /^\d{6}$/.test(vehicleNumber);
            assert.strictEqual(isValid, false);
        });

        // test (c) to ensure it rejects vehicle number more than 6 digits
        it('should return false for an invalid vehicle number (more than 6 digits)', () => {
            const vehicleNumber = '0101017';
            const isValid = /^\d{6}$/.test(vehicleNumber);
            assert.strictEqual(isValid, false);
        });

        // test (d) to ensure it rejects vehicle number with other characters other than digits or a mix of it
        it('should return false for an invalid vehicle number with non-numeric characters', () => {
            const vehicleNumber = 'hey999';
            const isValid = /^\d{6}$/.test(vehicleNumber);
            assert.strictEqual(isValid, false);
        });
    });

 