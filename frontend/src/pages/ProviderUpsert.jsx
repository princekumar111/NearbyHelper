// src/pages/ProviderUpsert.jsx
import React, { useState, useEffect } from 'react';
import API from '../utils/axios';
import { useNavigate } from 'react-router-dom';

const ProviderUpsert = () => {
  const [formData, setFormData] = useState({
    category: '',
    location: '',
    availability: '',
    contact: ''
  });

  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState('');
  const [alert, setAlert] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setToken(localStorage.getItem('token') || '');
  }, []);

  useEffect(() => {
    if (!token) return;

    const fetchOrCreateProfile = async () => {
      try {
        const res = await API.post('/providers/upsert', {}, {
          headers: { Authorization: `Bearer ${token}` }
        });

        setFormData({
          category: res.data.provider?.category || '',
          location: res.data.provider?.location || '',
          availability: res.data.provider?.availability || '',
          contact: res.data.provider?.contact || ''
        });

      } catch (err) {
        console.error('Error during initial upsert fetch:', err.response?.data?.msg || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrCreateProfile();
  }, [token]);

  const handleChange = e => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMsg('');

    try {
      await API.post('/providers/upsert', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // setMsg(res.data.msg);
      setAlert('Profile saved!');
      setTimeout(() => {
        navigate('/provider/dashboard');
      }, 1000);
    } catch (error) {
      console.error('Error in upsert submit:', error);
      setMsg(error.response?.data?.msg || 'Something went wrong');
    }
  };

  if (loading) return <div className="container mt-5">Loading...</div>;

  return (
    <div className="container mt-5" style={{ maxWidth: 600 }}>
      <h2 className="mb-4">Provider Profile</h2>
      {msg && <div className="alert alert-info">{msg}</div>}
      {alert && <div className="alert alert-success">{alert}</div>}

      <form onSubmit={handleSubmit}>
       <div className="mb-3">
  <label className="form-label">Category</label>
  <select
    name="category"
    className="form-select"
    value={formData.category}
    onChange={handleChange}
    required
  >
    <option value="">Select a category</option>
    <option value="Electrician">Electrician</option>
    <option value="Plumber">Plumber</option>
    <option value="Cleaner">Carpenter</option>
    <option value="Mechanic">Painter</option>
    <option value="Painter">Mechanic</option>
  </select>
</div>


        <div className="mb-3">
          <label className="form-label">Location</label>
          <input type="text" name="location" className="form-control" value={formData.location} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Availability</label>
          <input type="text" name="availability" className="form-control" value={formData.availability} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Contact</label>
          <input type="text" name="contact" className="form-control" value={formData.contact} onChange={handleChange} required />
        </div>

        <button type="submit" className="btn btn-primary w-100">Save Profile</button>
      </form>
    </div>
  );
};

export default ProviderUpsert;
