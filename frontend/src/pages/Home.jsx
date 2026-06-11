import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <Navbar />

      <section className="hero">
        <h1>Glow Begins Here ✨</h1>
        <p>Discover premium skincare, makeup & perfume collections.</p>
        <Link to="/products" className="shop-btn">Shop Now</Link>
      </section>

      <section className="features">
        <div className="feature">
          <h3>💄 Premium Quality</h3>
          <p>Top rated beauty products trusted by professionals.</p>
        </div>

        <div className="feature">
          <h3>🚚 Fast Delivery</h3>
          <p>Get your products delivered within 2–4 days.</p>
        </div>

        <div className="feature">
          <h3>⭐ Customer Trusted</h3>
          <p>Over 12,000+ happy customers!</p>
        </div>
      </section>

      <section className="categories">
        <h2>Shop Categories</h2>
        <div className="category-box">
          <Link to="/products" state={{ section: "skincare" }} className="category">Skin Care</Link>
          <Link to="/products" state={{ section: "makeup" }} className="category">Makeup</Link>
          <Link to="/products" state={{ section: "haircare" }} className="category">Hair Care</Link>
          <Link to="/products" state={{ section: "perfume" }} className="category">Perfume</Link>
        </div>
      </section>

      <section className="trending">
        <h2>Trending Now 🔥</h2>
        <div className="trend-box">
          <div className="trend-item">
            <img src="/images/liquid.jpg" />
            <p>Liquid Foundation</p>
          </div>
          <div className="trend-item">
            <img src="/images/mascara.webp" />
            <p>Volume Mascara</p>
          </div>
          <div className="trend-item">
            <img src="/images/face-cream.webp" />
            <p>Glow Face Cream</p>
          </div>
        </div>
      </section>

      <section className="reviews">
        <h2>Customer Reviews 💬</h2>
        <div className="review-box">
          <div className="review">
            <h3>⭐⭐⭐⭐⭐</h3>
            <p>"Amazing products! Very affordable."</p>
            <h4>- Jai Avinash</h4>
          </div>

          <div className="review">
            <h3>⭐⭐⭐⭐⭐</h3>
            <p>"Fast delivery and best quality!"</p>
            <h4>- Divya</h4>
          </div>

          <div className="review">
            <h3>⭐⭐⭐⭐⭐</h3>
            <p>"My go-to online store for cosmetics."</p>
            <h4>- Sneha</h4>
          </div>
        </div>
      </section>

      <section className="newsletter">
        <h2>Subscribe for Offers 📩</h2>
        <input type="text" placeholder="Enter your email" />
        <button>Subscribe</button>
      </section>

      <footer>
  <p>© 2025 Cosmetics Store.All Rights Reserved.</p>
</footer>

    </>
  );
}

export default Home;

