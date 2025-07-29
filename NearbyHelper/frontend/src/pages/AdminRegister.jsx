import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../utils/axios';  // import your axios instance

const AdminRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [alert, setAlert] = useState('');

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlert('');

    if (!formData.name || !formData.email || !formData.password) {
      setAlert('Please fill all fields.');
      return;
    }

    try {
      // Call your backend API for admin registration
      const res = await API.post('/admin/register', formData); 
      console.log(res.data);
      setAlert('Admin registered successfully!');
      setTimeout(() => {
        navigate('/admin/login');
      }, 1500);
    } catch (err) {
      setAlert(err.response?.data?.msg || 'Registration failed');
    }
  };

  return (
    <div className="container py-5" style={{ maxWidth: '400px' }}>
      <h2 className="mb-4">Admin Register</h2>
      {alert && <div className="alert alert-info">{alert}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">Register</button>
      </form>
    </div>
  );
};

export default AdminRegister;
