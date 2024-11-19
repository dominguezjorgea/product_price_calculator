class CalculatorService {
    calculatePrice(rawMaterialCost, profitMarginPercent, taxRate, expectedSales) {
        // Input validation
        this.validateInputs(rawMaterialCost, profitMarginPercent, taxRate);

        // Calculate components
        const profitMargin = this.calculateProfitMargin(rawMaterialCost, profitMarginPercent);
        const subtotal = this.calculateSubtotal(rawMaterialCost, profitMargin);
        const taxes = this.calculateTaxes(subtotal, taxRate);
        const finalPrice = this.calculateFinalPrice(subtotal, taxes);

        // Create price breakdown
        const priceBreakdown = {
            rawMaterialCost,
            profitMargin,
            subtotal,
            taxes,
            finalPrice,
            taxRate
        };

        // Calculate profit projections if expectedSales provided
        const profitProjections = expectedSales ? 
            this.calculateProfitProjections(finalPrice, rawMaterialCost, expectedSales) : 
            null;

        return { priceBreakdown, profitProjections };
    }

    validateInputs(rawMaterialCost, profitMarginPercent, taxRate) {
        if (rawMaterialCost <= 0) throw new Error('Raw material cost must be greater than 0');
        if (profitMarginPercent < 0) throw new Error('Profit margin cannot be negative');
        if (taxRate < 0) throw new Error('Tax rate cannot be negative');
    }

    calculateProfitMargin(rawMaterialCost, profitMarginPercent) {
        return rawMaterialCost * (profitMarginPercent / 100);
    }

    calculateSubtotal(rawMaterialCost, profitMargin) {
        return rawMaterialCost + profitMargin;
    }

    calculateTaxes(subtotal, taxRate) {
        return subtotal * (taxRate / 100);
    }

    calculateFinalPrice(subtotal, taxes) {
        return subtotal + taxes;
    }

    calculateProfitProjections(finalPrice, rawMaterialCost, expectedSales) {
        const profitPerUnit = finalPrice - rawMaterialCost;
        const totalProfit = profitPerUnit * expectedSales;

        return {
            expectedSales,
            profitPerUnit,
            totalProfit
        };
    }
}

module.exports = new CalculatorService();