const express = require('express');
const PriceController = require('../controllers/PriceController');

const router = express.Router();
const priceController = new PriceController();

router.post('/calculate-price', (req, res) => priceController.calculatePrice(req, res));

module.exports = router;
