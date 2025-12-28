import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import CheckoutModal from "../components/CheckoutModal";
import { Link } from "react-router-dom";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [showCheckout, setShowCheckout] = useState(false);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(savedCart);
  }, []);

  const removeFromCart = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
  };

  const updateQuantity = (index, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(index);
      return;
    }
    
    const updatedCart = [...cartItems];
    updatedCart[index].quantity = newQuantity;
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const proceedToCheckout = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    setShowCheckout(true);
  };

  const handleOrderSuccess = () => {
    // Clear cart after successful order
    setCartItems([]);
    localStorage.removeItem('cart');
    setShowCheckout(false);
    alert('Order placed successfully!');
    window.location.href = '/';
  };

  const formatCartForCheckout = () => {
    return cartItems.map(item => ({
      productId: item._id || item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity || 1,
      image: item.image
    }));
  };

  return (
    <>
      <Navbar />

      <section className="cart-page">
        <h2>Your Shopping Cart</h2>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty!</p>
            <Link to="/products" className="shop-btn">Continue Shopping</Link>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map((item, index) => (
                <div key={index} className="cart-item">
                  <img src={item.image} alt={item.name} />
                  <div className="cart-item-details">
                    <h3>{item.name}</h3>
                    <p className="cart-item-price">₹{item.price} each</p>
                    <div className="quantity-controls">
                      <button 
                        className="qty-btn" 
                        onClick={() => updateQuantity(index, (item.quantity || 1) - 1)}
                      >
                        -
                      </button>
                      <span className="quantity">{item.quantity || 1}</span>
                      <button 
                        className="qty-btn" 
                        onClick={() => updateQuantity(index, (item.quantity || 1) + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="item-total">
                    <p>₹{item.price * (item.quantity || 1)}</p>
                  </div>
                  <button 
                    className="remove-btn" 
                    onClick={() => removeFromCart(index)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <h3>Total: ₹{getTotalPrice()}</h3>
              <button className="checkout-btn" onClick={proceedToCheckout}>Proceed to Checkout</button>
            </div>
          </>
        )}
        
        <CheckoutModal 
          isOpen={showCheckout}
          onClose={() => setShowCheckout(false)}
          products={formatCartForCheckout()}
          totalAmount={getTotalPrice()}
          onSuccess={handleOrderSuccess}
        />
      </section>

      <footer>
        <p>© 2025 Cosmetics Store. Built with using React.</p>
      </footer>
    </>
  );
}

export default Cart;
