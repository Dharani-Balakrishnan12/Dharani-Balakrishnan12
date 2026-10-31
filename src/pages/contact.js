import React, { useState } from 'react';
import { toast } from 'react-toastify';
import "./contact.css";

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name && email && message) {
      try {
        const response = await fetch((process.env.REACT_APP_API_URL || 'http://localhost:8000/api/v1') + '/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name, email, message })
        });

        const data = await response.json();

        if (response.ok) {
          toast.success(data.message || "Message sent successfully!");
          setName('');
          setEmail('');
          setMessage('');
        } else {
          toast.error(data.message || "Failed to send message.");
        }
      } catch (error) {
        toast.error("An error occurred. Please try again later.");
        console.error("Contact form submission error:", error);
      }
    } else {
      toast.error("Please fill in all fields.");
    }
  };

  return (
    <section className="contact-section">
      <div className="contact-container">
        {/* Left Content */}
        <div className="contact-info">
          <h1>Contact Us</h1>
          <p>
            Have questions or need help choosing the right books?
            We’re here to help you.
          </p>

          <div className="contact-details">
            <p><strong>📍 Address:</strong> Tamil Nadu, India</p>
            <p><strong>📞 Phone:</strong> 8300416514</p>
            <p><strong>✉️ Email:</strong> dharanikoshi2003@gmail.com</p>
          </div>
        </div>

        {/* Right Form */}
        <div className="contact-form">
          <form onSubmit={handleSubmit}>
            <input 
              type="text" 
              placeholder="Your Name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required 
            />
            <input 
              type="email" 
              placeholder="Your Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
            <textarea 
              placeholder="Your Message" 
              rows="5" 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required 
            />
            <button type="submit">Send Message</button>
          </form>
        </div>
      </div>

      {/* LOCATION MAP */}
      <div className="location-section">
        <h2>Our Location</h2>

        <div className="map-container">
          <iframe
            title="InnIlai Location"
            src="https://www.google.com/maps?q=Tamil%20Nadu%20India&output=embed"

            loading="lazy"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  );
}
