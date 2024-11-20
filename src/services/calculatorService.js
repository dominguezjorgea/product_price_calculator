const { ValidationError, CalculationError } = require('../utils/errorHandler');

class CalculatorService {
    calculatePrice(rawMaterialCost, profitMarginPercent, taxRate, expectedSales) {
        try {
            // Input validation
            this.validateInputs(rawMaterialCost, profitMarginPercent, taxRate);

            // Calculate price breakdown
            const priceBreakdown = {
                rawMaterialCost: Number(rawMaterialCost),
                profitMargin: Number(rawMaterialCost * (profitMarginPercent / 100)),
                subtotal: 0,
                taxes: 0,
                finalPrice: 0,
                taxRate: Number(taxRate)
            };

            // Calculate subtotal
            priceBreakdown.subtotal = priceBreakdown.rawMaterialCost + priceBreakdown.profitMargin;
            
            // Calculate taxes
            priceBreakdown.taxes = priceBreakdown.subtotal * (taxRate / 100);
            
            // Calculate final price
            priceBreakdown.finalPrice = priceBreakdown.subtotal + priceBreakdown.taxes;

            // Calculate profit projections if expectedSales is provided
            const profitProjections = expectedSales ? {
                expectedSales: Number(expectedSales),
                profitPerUnit: Number(priceBreakdown.finalPrice - priceBreakdown.rawMaterialCost),
                totalProfit: Number((priceBreakdown.finalPrice - priceBreakdown.rawMaterialCost) * expectedSales)
            } : null;

            return { priceBreakdown, profitProjections };
        } catch (error) {
            throw new Error(`Calculation failed: ${error.message}`);
        }
    }

    validateInputs(rawMaterialCost, profitMarginPercent, taxRate) {
        if (rawMaterialCost <= 0) throw new Error('Raw material cost must be greater than 0');
        if (profitMarginPercent < 0) throw new Error('Profit margin cannot be negative');
        if (taxRate < 0) throw new Error('Tax rate cannot be negative');
    }
}

module.exports = new CalculatorService();