import { useState, useEffect } from "react";
import { useAdmin } from "../context/AdminContext";
import Navbar from "../components/Navbar";
import CheckoutModal from "../components/CheckoutModal";

function Products() {
  const { products } = useAdmin();
  const [displayProducts, setDisplayProducts] = useState([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutProducts, setCheckoutProducts] = useState([]);
  const [checkoutTotal, setCheckoutTotal] = useState(0);

  useEffect(() => {
    setDisplayProducts(products);
  }, [products]);

  const addToCart = async (product) => {
    try {
      // Generate a session ID if not exists
      let sessionId = localStorage.getItem('sessionId');
      if (!sessionId) {
        sessionId = 'user_' + Date.now();
        localStorage.setItem('sessionId', sessionId);
      }

      const cartData = {
        sessionId,
        productId: product._id || product.id,
        name: product.name,
        price: product.price,
        quantity: 1
      };

      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/cart/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(cartData)
      });

      const result = await response.json();
      
      if (result.success) {
        alert(`${product.name} added to cart!`);
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error('Cart error:', error);
      // Fallback to localStorage
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const existingItem = cart.find(item => item.id === product.id);
      
      if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 1) + 1;
      } else {
        cart.push({ ...product, quantity: 1 });
      }
      
      localStorage.setItem("cart", JSON.stringify(cart));
      alert(`${product.name} added to cart!`);
    }
  };

  const buyNow = (product) => {
    const orderProduct = {
      productId: product._id || product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image
    };
    
    setCheckoutProducts([orderProduct]);
    setCheckoutTotal(product.price);
    setShowCheckout(true);
  };

  const handleOrderSuccess = () => {
    // Redirect to home or show success message
    window.location.href = '/';
  };

  return (
    <>
      <Navbar />

      <section className="products" id="skincare">
        <h2>Skin Care Products</h2>
        <div className="product-box">
          {displayProducts.filter(p => p.category === "skincare").map((product) => (
            <div key={product._id || product.id} className="product">
              <img src={product.image} alt={product.name} />
              <h3>{product.name} - ₹{product.price}</h3>
              <div className="product-buttons">
                <button className="cart-btn" onClick={() => addToCart(product)}>Add to Cart</button>
                <button className="buy-btn" onClick={() => buyNow(product)}>Buy Now</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="products" id="makeup">
        <h2>Makeup Products</h2>
        <div className="product-box">
          {displayProducts.filter(p => p.category === "makeup").map((product) => (
            <div key={product._id || product.id} className="product">
              <img src={product.image} alt={product.name} />
              <h3>{product.name} - ₹{product.price}</h3>
              <div className="product-buttons">
                <button className="cart-btn" onClick={() => addToCart(product)}>Add to Cart</button>
                <button className="buy-btn" onClick={() => buyNow(product)}>Buy Now</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="products" id="haircare">
        <h2>Hair Care Products</h2>
        <div className="product-box">
          {displayProducts.filter(p => p.category === "haircare").map((product) => (
            <div key={product._id || product.id} className="product">
              <img src={product.image} alt={product.name} />
              <h3>{product.name} - ₹{product.price}</h3>
              <div className="product-buttons">
                <button className="cart-btn" onClick={() => addToCart(product)}>Add to Cart</button>
                <button className="buy-btn" onClick={() => buyNow(product)}>Buy Now</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="products" id="perfume">
        <h2>Perfume Collection</h2>
        <div className="product-box">
          {displayProducts.filter(p => p.category === "perfume").map((product) => (
            <div key={product._id || product.id} className="product">
              <img src={product.image} alt={product.name} />
              <h3>{product.name} - ₹{product.price}</h3>
              <div className="product-buttons">
                <button className="cart-btn" onClick={() => addToCart(product)}>Add to Cart</button>
                <button className="buy-btn" onClick={() => buyNow(product)}>Buy Now</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <CheckoutModal 
        isOpen={showCheckout}
        onClose={() => setShowCheckout(false)}
        products={checkoutProducts}
        totalAmount={checkoutTotal}
        onSuccess={handleOrderSuccess}
      />

      <footer>
        <p>© 2025 Cosmetics Store. All Rights Reserved.</p>
      </footer>
    </>
  );
}

export default Products;