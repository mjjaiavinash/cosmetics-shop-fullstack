import { useState } from 'react';
import Navbar from '../components/Navbar';
import { API_BASE_URL } from '../config/api';

function Contact() {
  const [formData, setFormData] = useState({
    name: '', email: '', message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        alert('Thank you for your message! We will get back to you soon.');
        setFormData({ name: '', email: '', message: '' });
      } else {
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to send message. Please try again.');
    }
  };

  return (
    <>
      <Navbar />
      
      <section className="page-section">
        <h1>Contact Us</h1>
        
        <div className="contact-info">
          <div className="contact-item">
            <h3>📧 Email</h3>
            <p>mjjaiavinash2006@gmail.com</p>
          </div>
          
          <div className="contact-item">
            <h3>📞 Phone</h3>
            <p>+91 79044 40940</p>
          </div>
          
          <div className="contact-item">
            <h3>📍 Address</h3>
            <p>Beauty Street, Chennai, Tamil Nadu 600001</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="contact-form">
          <h2>Send us a Message</h2>
          
          <input
            type="text"
            placeholder="Your Name"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
          />
          
          <input
            type="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
          />
          
          <textarea
            placeholder="Your Message"
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
            rows="5"
            required
          />
          
          <button type="submit" className="submit-btn">Send Message</button>
        </form>
      </section>

      <footer>
        <p>© 2025 Cosmetics Store. All Rights Reserved.</p>
      </footer>
    </>
  );
}

export default Contact;