const express = require('express');
const Order = require('../models/Order');

const router = express.Router();

// Place new order
router.post('/place-order', async (req, res) => {
  try {
    const { customerName, phone, address, paymentMethod, products, totalAmount } = req.body;
    
    const order = new Order({
      customerName,
      phone,
      address,
      paymentMethod,
      products,
      totalAmount
    });
    
    await order.save();
    
    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      orderId: order._id
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to place order',
      error: error.message
    });
  }
});

// Get all orders (for admin)
router.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;