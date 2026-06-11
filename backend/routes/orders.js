const express = require('express');
const Order = require('../models/Order');
const router = express.Router();

// Place order
router.post('/place-order', async (req, res) => {
  try {
    const { customerName, phone, address, products, totalAmount, paymentMethod } = req.body;
    
    const order = new Order({
      customerName,
      phone,
      address,
      products,
      totalAmount,
      paymentMethod
    });

    await order.save();
    res.json({ success: true, message: 'Order placed successfully', orderId: order._id });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to place order' });
  }
});

// Get all orders
router.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find().sort({ orderDate: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch orders' });
  }
});

module.exports = router;