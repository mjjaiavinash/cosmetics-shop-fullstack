import Navbar from "../components/Navbar";

function Privacy() {
  return (
    <>
      <Navbar />

      <section className="page-section">
        <h1>Privacy Policy</h1>

        <p>
          At <b>Cosmetics Store</b>, your privacy and trust are extremely important to us.
          This Privacy Policy explains how we collect, store, protect, and use your information
          when you visit our website or make a purchase.
        </p>

        <h2>Information We Collect 📌</h2>
        <ul className="about-list">
          <li>✔ Personal details (Name, Email, Phone Number)</li>
          <li>✔ Delivery Address for shipping your orders</li>
          <li>✔ Login information stored using browser localStorage</li>
          <li>✔ Your browsing activity and product preferences</li>
          <li>✔ Order and payment history (excluding card details)</li>
        </ul>

        <h2>How We Use Your Information 📝</h2>
        <ul className="about-list">
          <li>✔ To process and deliver your orders safely</li>
          <li>✔ To update you with order status & promotional offers</li>
          <li>✔ To improve our website and customer experience</li>
          <li>✔ To ensure secure login and account access</li>
          <li>✔ To provide customer support and assistance</li>
        </ul>

        <h2>How We Protect Your Data 🔐</h2>
        <p>
          Your personal data is securely stored and protected using modern encryption techniques.
          We do <b>not</b> share, sell, or transfer your personal information to any third-party
          companies without your permission.
        </p>

        <h2>Your Rights as a Customer 🧾</h2>
        <ul className="about-list">
          <li>✔ Right to request deletion of your stored data</li>
          <li>✔ Right to update incorrect personal details</li>
          <li>✔ Right to unsubscribe from marketing emails</li>
          <li>✔ Right to access the information we store about you</li>
        </ul>

        <h2>Cookies & Tracking 🍪</h2>
        <p>
          We use cookies to improve your shopping experience, analyze website traffic, and show
          personalized product recommendations. Cookies do <b>not</b> store personal passwords
          or sensitive information.
        </p>

        <h2>Contact Us 📞</h2>
        <p>
          If you have any questions about our privacy practices or need assistance,
          please contact our support team. We are always here to help you!
        </p>
      </section>

      <footer>
  <p>© 2025 Cosmetics Store. All Rights Reserved</p>
</footer>
    </>
  );
}

export default Privacy;
