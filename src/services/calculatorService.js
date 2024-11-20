const { ValidationError, CalculationError } = require('../utils/errorHandler');
const logger = require('../utils/logger');

class CalculatorService {
    calculatePrice(rawMaterialCost, profitMarginPercent, taxRate, expectedSales) {
        try {
            logger.info('Starting price calculation', {
                inputs: {
                    rawMaterialCost,
                    profitMarginPercent,
                    taxRate,
                    expectedSales
                }
            });

            // Input validation
            this.validateInputs(rawMaterialCost, profitMarginPercent, taxRate);
            logger.debug('Input validation passed');

            // Calculate price breakdown
            const priceBreakdown = {
                rawMaterialCost: Number(rawMaterialCost),
                profitMargin: Number(rawMaterialCost * (profitMarginPercent / 100)),
                subtotal: 0,
                taxes: 0,
                finalPrice: 0,
                taxRate: Number(taxRate)
            };

            // Log intermediate calculations
            logger.debug('Initial price breakdown calculated', { priceBreakdown });

            // Calculate subtotal
            priceBreakdown.subtotal = priceBreakdown.rawMaterialCost + priceBreakdown.profitMargin;
            logger.debug('Subtotal calculated', { subtotal: priceBreakdown.subtotal });

            // Calculate taxes
            priceBreakdown.taxes = priceBreakdown.subtotal * (taxRate / 100);
            logger.debug('Taxes calculated', { taxes: priceBreakdown.taxes });

            // Calculate final price
            priceBreakdown.finalPrice = priceBreakdown.subtotal + priceBreakdown.taxes;
            logger.debug('Final price calculated', { finalPrice: priceBreakdown.finalPrice });

            // Calculate profit projections
            const profitProjections = expectedSales ? {
                expectedSales: Number(expectedSales),
                profitPerUnit: Number(priceBreakdown.finalPrice - priceBreakdown.rawMaterialCost),
                totalProfit: Number((priceBreakdown.finalPrice - priceBreakdown.rawMaterialCost) * expectedSales)
            } : null;

            logger.info('Calculation completed successfully', {
                priceBreakdown,
                profitProjections
            });

            return { priceBreakdown, profitProjections };
        } catch (error) {
            logger.error('Calculation failed', {
                error: error.message,
                inputs: {
                    rawMaterialCost,
                    profitMarginPercent,
                    taxRate,
                    expectedSales
                }
            });
            throw error;
        }
    }

    validateInputs(rawMaterialCost, profitMarginPercent, taxRate) {
        try {
            logger.debug('Validating inputs', {
                rawMaterialCost,
                profitMarginPercent,
                taxRate
            });

            if (rawMaterialCost <= 0) {
                logger.warn('Invalid raw material cost', { rawMaterialCost });
                throw new Error('Raw material cost must be greater than 0');
            }
            if (profitMarginPercent < 0) {
                logger.warn('Invalid profit margin', { profitMarginPercent });
                throw new Error('Profit margin cannot be negative');
            }
            if (taxRate < 0) {
                logger.warn('Invalid tax rate', { taxRate });
                throw new Error('Tax rate cannot be negative');
            }

            logger.debug('Input validation successful');
        } catch (error) {
            logger.error('Input validation failed', { error: error.message });
            throw error;
        }
    }
}

// Keep only this line:
module.exports = new CalculatorService();