const request = require('supertest');
const express = require('express');
const calculatorRoutes = require('../../src/routes/calculatorRoutes');

const app = express();
app.use(express.json());
app.use('/api', calculatorRoutes);

describe('API Tests', () => {
    test('POST /api/calculate-price should work with valid data', async () => {
        const response = await request(app)
            .post('/api/calculate-price')
            .send({
                rawMaterialCost: 100,
                profitMarginPercent: 20,
                taxRate: 21,
                expectedSales: 1000
            });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('priceBreakdown');
        expect(response.body.priceBreakdown).toHaveProperty('finalPrice');
    });

    test('should return 400 for invalid input', async () => {
        const response = await request(app)
            .post('/api/calculate-price')
            .send({
                rawMaterialCost: -100,
                profitMarginPercent: 20,
                taxRate: 21
            });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error');
    });

    test('should return 400 when required fields are missing', async () => {
        const response = await request(app)
            .post('/api/calculate-price')
            .send({
                rawMaterialCost: 100
                // missing profitMarginPercent and taxRate
            });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Raw material cost, profit margin, and tax rate are required');
    });
}); 