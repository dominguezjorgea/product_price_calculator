class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ValidationError';
        this.status = 400;
    }
}

class CalculationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'CalculationError';
        this.status = 500;
    }
}

class InputError extends Error {
    constructor(message) {
        super(message);
        this.name = 'InputError';
        this.status = 400;
    }
}

module.exports = {
    ValidationError,
    CalculationError,
    InputError
};