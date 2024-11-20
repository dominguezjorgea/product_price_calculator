# Product Price Calculator API Documentation

## Overview

This API provides endpoints for calculating product prices based on raw material costs, profit margins, and tax rates. It also provides profit projections based on expected sales.

## Base URL

const express = require('express');
const PriceController = require('../controllers/PriceController');

const router = express.Router();
const priceController = new PriceController();

router.post('/calculate-price', (req, res) => priceController.calculatePrice(req, res));

module.exports = router;

http://localhost:3000/api

## Endpoints

### Calculate Price

Calculates the final price and profit projections for a product.

- **URL**: `/calculate-price`
- **Method**: `POST`
- **Content-Type**: `application/json`

#### Request Body

```json
{
    "rawMaterialCost": number,     // Cost of raw materials (> 0)
    "profitMarginPercent": number, // Desired profit margin percentage (≥ 0)
    "taxRate": number,             // Tax rate percentage (≥ 0)
    "expectedSales": number        // Expected number of units to be sold (optional, integer)
}
```

#### Success Response

- **Code**: 200 OK
- **Content Example**:

```json
{
  "priceBreakdown": {
    "rawMaterialCost": 100.0,
    "profitMargin": 30.0,
    "subtotal": 130.0,
    "taxes": 27.3,
    "finalPrice": 157.3,
    "taxRate": 21
  },
  "profitProjections": {
    "expectedSales": 1000,
    "profitPerUnit": 57.3,
    "totalProfit": 57300.0
  }
}
```

#### Error Responses

1. **Invalid Input**

- **Code**: 400 Bad Request
- **Content**:

```json
{
  "error": "Raw material cost, profit margin, and tax rate are required"
}
```

2. **Validation Error**

- **Code**: 400 Bad Request
- **Content**:

```json
{
  "error": "Raw material cost must be greater than 0"
}
```

3. **Calculation Error**

- **Code**: 500 Internal Server Error
- **Content**:

```json
{
  "error": "Calculation failed: [error details]"
}
```

## Data Validation Rules

1. **Raw Material Cost**

   - Required
   - Must be a number
   - Must be greater than 0

2. **Profit Margin Percentage**

   - Required
   - Must be a number
   - Must be 0 or greater

3. **Tax Rate**

   - Required
   - Must be a number
   - Must be 0 or greater

4. **Expected Sales**
   - Optional
   - If provided, must be an integer
   - Must be greater than 0

## Response Fields Explanation

### Price Breakdown

- `rawMaterialCost`: Original cost of materials
- `profitMargin`: Calculated profit amount
- `subtotal`: Sum of raw material cost and profit margin
- `taxes`: Calculated tax amount
- `finalPrice`: Total price including all components
- `taxRate`: Applied tax rate percentage

### Profit Projections

- `expectedSales`: Number of units expected to sell
- `profitPerUnit`: Profit made on each unit
- `totalProfit`: Total projected profit for all units

## Examples

### Basic Calculation Request

```curl
curl -X POST http://localhost:3000/api/calculate-price \
  -H "Content-Type: application/json" \
  -d '{
    "rawMaterialCost": 100,
    "profitMarginPercent": 30,
    "taxRate": 21,
    "expectedSales": 1000
  }'
```

### Calculation Without Expected Sales

```curl
curl -X POST http://localhost:3000/api/calculate-price \
  -H "Content-Type: application/json" \
  -d '{
    "rawMaterialCost": 100,
    "profitMarginPercent": 30,
    "taxRate": 21
  }'
```

## Error Handling

The API uses standard HTTP status codes:

- `200`: Success
- `400`: Bad Request (invalid input)
- `500`: Server Error

All error responses include a message explaining the error.

## Rate Limiting

Currently, there are no rate limits implemented.

## Notes

1. All monetary values are returned with 2 decimal places
2. Percentages are handled as whole numbers (e.g., 21 for 21%)
3. Calculations are performed in order: profit margin → subtotal → taxes → final price

```

```
