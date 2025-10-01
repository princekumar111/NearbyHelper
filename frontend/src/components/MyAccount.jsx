// src/components/MyAccount.jsx
import React, { useState, useEffect } from 'react';
import { getUserFromToken } from '../utils/auth'; // Your auth helper
import './MyAccount.css';

const MyAccount = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    const loggedUser = getUserFromToken();
    if (loggedUser) {
      setUser(loggedUser);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Add API call to update user profile
    alert('Profile updated successfully!');
  };

  return (
    <div className="container myaccount-container py-5">
      <h2 className="mb-4">My Account</h2>

      <div className="card shadow-sm p-4">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              className="form-control" 
              value={user.name} 
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
              value={user.email} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="mb-3">
            <label htmlFor="phone" className="form-label">Phone</label>
            <input 
              type="text" 
              id="phone" 
              name="phone" 
              className="form-control" 
              value={user.phone} 
              onChange={handleChange} 
            />
          </div>

          <button type="submit" className="btn btn-primary">Update Profile</button>
        </form>
      </div>
    </div>
  );
};

export default MyAccount;
