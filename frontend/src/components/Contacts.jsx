// src/components/Contact.jsx
import React, { useState } from 'react';
import './Contacts.css';

const Contacts = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Integrate API to send contact message
    alert('Your message has been sent successfully!');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="container contact-container py-5">
      <h2 className="mb-4 text-center">Contact Us</h2>
      
      <div className="row">
        {/* Contact Form */}
        <div className="col-md-6 mb-4">
          <div className="card shadow-sm p-4">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  className="form-control" 
                  value={formData.name} 
                  onChange={handleChange} 
                  required 
                />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  className="form-control" 
                  value={formData.email} 
                  onChange={handleChange} 
                  required 
                />
              </div>

              <div className="mb-3">
                <label htmlFor="message" className="form-label">Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  className="form-control" 
                  rows="5" 
                  value={formData.message} 
                  onChange={handleChange} 
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary w-100">Send Message</button>
            </form>
          </div>
        </div>

        {/* Contact Info */}
        <div className="col-md-6">
          <div className="card shadow-sm p-4 h-100">
            <h4>Get in Touch</h4>
            <p>We’d love to hear from you! Reach out to us with any questions or inquiries.</p>
            <ul className="list-unstyled">
              <li><strong>Address:</strong> Knowledge Park II Greater Noida 201310 India</li>
              <li><strong>Email:</strong> support@nearbyhelper.com</li>
              <li><strong>Phone:</strong> +1 (555) 123-4567</li>
              <li><strong>Working Hours:</strong> Mon-Fri, 9:00 AM - 6:00 PM</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
