const { ValidationError, CalculationError, InputError } = require('../../src/utils/errorHandler');

describe('Error Handler', () => {
    test('ValidationError should have correct properties', () => {
        const error = new ValidationError('Invalid input');
        expect(error.name).toBe('ValidationError');
        expect(error.message).toBe('Invalid input');
        expect(error.status).toBe(400);
    });

    test('CalculationError should have correct properties', () => {
        const error = new CalculationError('Calculation failed');
        expect(error.name).toBe('CalculationError');
        expect(error.message).toBe('Calculation failed');
        expect(error.status).toBe(500);
    });

    test('InputError should have correct properties', () => {
        const error = new InputError('Missing required field');
        expect(error.name).toBe('InputError');
        expect(error.message).toBe('Missing required field');
        expect(error.status).toBe(400);
    });

    test('Error classes should extend Error', () => {
        const validationError = new ValidationError('test');
        const calculationError = new CalculationError('test');
        const inputError = new InputError('test');

        expect(validationError instanceof Error).toBe(true);
        expect(calculationError instanceof Error).toBe(true);
        expect(inputError instanceof Error).toBe(true);
    });

    test('Errors should preserve stack trace', () => {
        const error = new ValidationError('test');
        expect(error.stack).toBeDefined();
    });
}); 