const express = require('express');

const productController = require('../controllers/products.controllers');
const router = express.Router();

// GET
router.get('/{:title}', productController.getProducts);

// POST
router.post('/', productController.createProduct);

// PUT
router.put('/', productController.updateProduct);

// DELETE
router.delete('/', productController.deleteProduct);

module.exports = router;