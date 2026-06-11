import { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config/api';

function CheckoutModal({ isOpen, onClose, products, totalAmount, onSuccess }) {
  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    phone: '',
    address: '',
    paymentMethod: 'cod'
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const orderData = {
        ...formData,
        products,
        totalAmount
      };

      const response = await axios.post(`${API_BASE_URL}/api/orders`, orderData);
      
      if (response.data.success) {
        alert('Order placed successfully!');
        onSuccess();
        onClose();
        setFormData({ customerName: '', email: '', phone: '', address: '', paymentMethod: 'cod' });
      }
    } catch (error) {
      alert('Failed to place order. Please try again.');
      console.error('Order error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal checkout-modal">
        <h2>Checkout</h2>
        
        <div className="order-summary">
          <h3>Order Summary</h3>
          {products.map((product, index) => (
            <div key={index} className="checkout-item">
              <span>{product.name}</span>
              <span>₹{product.price} x {product.quantity}</span>
            </div>
          ))}
          <div className="checkout-total">
            <strong>Total: ₹{totalAmount}</strong>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            value={formData.customerName}
            onChange={(e) => setFormData({...formData, customerName: e.target.value})}
            required
          />
          
          <input
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
          />
          
          <input
            type="tel"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            required
          />
          
          <textarea
            placeholder="Delivery Address"
            value={formData.address}
            onChange={(e) => setFormData({...formData, address: e.target.value})}
            required
            rows="3"
          />
          
          <select
            value={formData.paymentMethod}
            onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
          >
            <option value="cod">Cash on Delivery</option>
            <option value="upi">UPI Payment</option>
            <option value="card">Card Payment</option>
          </select>
          
          <div className="form-actions">
            <button type="submit" disabled={loading} className="place-order-btn">
              {loading ? 'Placing Order...' : 'Place Order'}
            </button>
            <button type="button" onClick={onClose} className="cancel-btn">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CheckoutModal;