const calculatorService = require('../../src/services/calculatorService');

describe('Calculator Service', () => {
    describe('calculatePrice', () => {
        test('should calculate price correctly with valid inputs', () => {
            const result = calculatorService.calculatePrice(100, 20, 21, 1000);
            
            expect(result.priceBreakdown).toEqual({
                rawMaterialCost: 100,
                profitMargin: 20,
                subtotal: 120,
                taxes: 25.2,
                finalPrice: 145.2,
                taxRate: 21
            });
        });

        test('should throw error for negative raw material cost', () => {
            expect(() => {
                calculatorService.calculatePrice(-100, 20, 21, 1000);
            }).toThrow('Raw material cost must be greater than 0');
        });

        test('should handle calculation with zero expected sales', () => {
            const result = calculatorService.calculatePrice(100, 20, 21, 0);
            expect(result.profitProjections).toBeNull();
        });

        test('should handle calculation with null expected sales', () => {
            const result = calculatorService.calculatePrice(100, 20, 21, null);
            expect(result.profitProjections).toBeNull();
        });

        test('should validate tax rate correctly', () => {
            expect(() => {
                calculatorService.calculatePrice(100, 20, -1, 1000);
            }).toThrow('Tax rate cannot be negative');
        });

        test('should validate profit margin correctly', () => {
            expect(() => {
                calculatorService.calculatePrice(100, -20, 21, 1000);
            }).toThrow('Profit margin cannot be negative');
        });
    });
}); 