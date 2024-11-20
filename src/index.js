const express = require('express');
const calculatorService = require('./services/calculatorService');
const { ValidationError, CalculationError, InputError } = require('./utils/errorHandler');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    
    if (err instanceof ValidationError || err instanceof InputError) {
        return res.status(400).json({ error: err.message });
    }
    
    if (err instanceof CalculationError) {
        return res.status(500).json({ error: err.message });
    }
    
    res.status(500).json({ error: 'Something went wrong!' });
});

// API endpoint with async error handling
app.post('/calculate-price', async (req, res, next) => {
    try {
        const { rawMaterialCost, profitMarginPercent, taxRate, expectedSales } = req.body;

        if (!rawMaterialCost || !profitMarginPercent || !taxRate) {
            throw new InputError('Raw material cost, profit margin, and tax rate are required');
        }

        const result = await calculatorService.calculatePrice(
            rawMaterialCost,
            profitMarginPercent,
            taxRate,
            expectedSales
        );

        res.json(result);
    } catch (error) {
        next(error);
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});