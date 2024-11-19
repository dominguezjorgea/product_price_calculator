const express = require('express');
const calculatorService = require('./services/calculatorService');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// API endpoint
app.post('/calculate-price', (req, res) => {
    try {
        const { rawMaterialCost, profitMarginPercent, taxRate, expectedSales } = req.body;

        // Validate required fields
        if (!rawMaterialCost || !profitMarginPercent || !taxRate) {
            return res.status(400).json({
                error: 'Raw material cost, profit margin, and tax rate are required'
            });
        }

        // Use service to calculate
        const result = calculatorService.calculatePrice(
            parseFloat(rawMaterialCost),
            parseFloat(profitMarginPercent),
            parseFloat(taxRate),
            parseInt(expectedSales)
        );

        res.json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});