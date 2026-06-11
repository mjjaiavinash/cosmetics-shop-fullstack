import Navbar from "../components/Navbar";

function About() {
  return (
    <>
      <Navbar />

      <section className="page-section">
        <h1>About Us</h1>

        <p>
          Welcome to <b>Cosmetics Store</b> — the destination where beauty meets confidence.
          Our journey began with a strong belief that everyone deserves access to premium beauty
          products without spending a fortune. Today, we proudly serve thousands of customers
          across India.
        </p>

        <h2>Our Mission ✨</h2>
        <p>At Cosmetics Store, our mission is simple:</p>
        <ul className="about-list">
          <li>✔ To make high-quality cosmetics accessible to everyone.</li>
          <li>✔ To deliver safe, skin-friendly and effective beauty products.</li>
          <li>✔ To ensure affordability without compromising quality.</li>
          <li>✔ To inspire confidence and self-love through beauty.</li>
        </ul>

        <h2>Who We Are ❤️</h2>
        <p>
          We are a passionate team of beauty experts, skincare enthusiasts, and dedicated professionals.
          We continuously research global beauty trends and work with trusted brands to bring you the best
          products in the world of cosmetics.
        </p>

        <h2>What Makes Us Different? 🌟</h2>
        <ul className="about-list">
          <li>✔ 100% genuine and dermatologist-tested products</li>
          <li>✔ Fast & secure delivery across India</li>
          <li>✔ Easy returns and customer-focused service</li>
          <li>✔ Regular discounts, deals, and seasonal offers</li>
          <li>✔ A curated selection with over 250+ beauty essentials</li>
        </ul>

        <h2>Our Promise to You 🤝</h2>
        <p>
          We promise to bring you only the safest, most effective, and latest beauty solutions.
          Whether you’re looking for skincare, haircare, makeup, or perfumes — we’re here to guide
          you toward the right choices.
        </p>

        <p><b>Thank you for trusting Cosmetics Store. Your beauty journey starts here! 💕</b></p>
      </section>

      <footer>
  <p>© 2025 Cosmetics Store.All Rights Reserved.</p>
</footer>
    </>
  );
}

export default About;
