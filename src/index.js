const express = require('express');
const calculatorService = require('./services/calculatorService');
const logger = require('./utils/logger');

const app = express();
const port = process.env.PORT || 3000;

// Add these middleware BEFORE your routes
app.use(express.json());  // <-- This is crucial for parsing JSON body
app.use(express.static('public'));

// Request logging middleware
app.use((req, res, next) => {
    logger.info('Incoming request', {
        method: req.method,
        path: req.path,
        body: req.body,
        query: req.query,
        ip: req.ip
    });
    next();
});

// API endpoint
app.post('/calculate-price', (req, res) => {
    try {
        logger.info('Request body:', req.body);  // Add this log to debug

        const { rawMaterialCost, profitMarginPercent, taxRate, expectedSales } = req.body;

        // Validate that we have all required fields
        if (!rawMaterialCost || !profitMarginPercent || !taxRate) {
            logger.warn('Missing required fields');
            return res.status(400).json({
                error: 'Raw material cost, profit margin, and tax rate are required'
            });
        }

        const result = calculatorService.calculatePrice(
            Number(rawMaterialCost),
            Number(profitMarginPercent),
            Number(taxRate),
            Number(expectedSales)
        );

        logger.info('Calculation successful', { result });
        res.json(result);
    } catch (error) {
        logger.error('Calculation error:', error);
        res.status(400).json({ error: error.message });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    logger.error('Unhandled error', {
        error: err.message,
        stack: err.stack
    });
    res.status(500).json({ error: 'Internal server error' });
});

app.listen(port, () => {
    logger.info(`Server started on port ${port}`);
});