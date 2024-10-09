
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');
router.post('/orders', orderController.createOrder);

router.get('/orders/:id', orderController.getOrderById);

router.get('/orders', orderController.getOrders);

router.put('/orders/:id', orderController.updateOrderStatus);

router.delete('/orders/:id', orderController.deleteOrder);

module.exports = router;
