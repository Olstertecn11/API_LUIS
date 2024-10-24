const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');

router.post('/product', productController.createProduct);
router.get('/product', productController.getAllProducts);
router.get('/product/:id', productController.getProductById);
router.get('/product/stats', productController.getStats);
router.put('/product/:id', productController.updateProduct);
router.delete('/product/:id', productController.deleteProduct);

module.exports = router;
