const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Calculate price service
app.post('/calculate-price', (req, res) => {
    const { rawMaterialCost, profitMarginPercent, expectedSales, taxRate } = req.body;

    // Input validation
    if (!rawMaterialCost || !profitMarginPercent || !taxRate) {
        return res.status(400).json({
            error: 'Raw material cost, profit margin, and tax rate are required'
        });
    }

    try {
        // Calculate final price
        const profitMargin = rawMaterialCost * (profitMarginPercent / 100);
        const subtotal = rawMaterialCost + profitMargin;
        const taxes = subtotal * (taxRate / 100);
        const finalPrice = subtotal + taxes;

        // Calculate profit projections if expectedSales is provided
        let profitProjections = null;
        if (expectedSales) {
            const profitPerUnit = finalPrice - rawMaterialCost;
            const totalProfit = profitPerUnit * expectedSales;
            profitProjections = {
                expectedSales,
                profitPerUnit,
                totalProfit
            };
        }

        // Send response
        res.json({
            priceBreakdown: {
                rawMaterialCost,
                profitMargin,
                subtotal,
                taxes,
                finalPrice,
                taxRate
            },
            profitProjections
        });

    } catch (error) {
        res.status(500).json({
            error: 'Error calculating price',
            details: error.message
        });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});