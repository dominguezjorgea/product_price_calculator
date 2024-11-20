const express = require('express');
const router = express.Router();
const calculatorService = require('../services/calculatorService');

router.post('/calculate-price', (req, res) => {
    try {
        const { rawMaterialCost, profitMarginPercent, taxRate, expectedSales } = req.body;

        if (!rawMaterialCost || !profitMarginPercent || !taxRate) {
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

        res.json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router; 