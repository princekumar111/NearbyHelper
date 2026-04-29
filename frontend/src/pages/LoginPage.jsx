import React, { useState } from 'react';
import API from '../utils/axios';
import { useNavigate, Link } from 'react-router-dom';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await API.post('/users/login', formData);
      const { token, user } = res.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      if (user.role === 'admin') {
        navigate('/admin/dashboard');
      } else if (user.role === 'provider') {
        navigate('/provider/dashboard');
      } else {
        console.log("Logged-in user:", user);
        navigate('/user/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials');
    }
  };

  return (
    <div 
      className="d-flex align-items-center justify-content-center vh-100" 
      style={{ 
        backgroundColor: '#f8fafc',
        backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)',
        backgroundSize: '30px 30px' 
      }}
    >
      <div 
        className="card border-0 p-4 p-md-5 shadow-lg" 
        style={{ 
          width: '100%', 
          maxWidth: '440px', 
          borderRadius: '2rem',
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
        }}
      >
        {/* Header Section - No Box Above */}
        <div className="text-center mb-4">
          <h1 className="fw-bold mb-1" style={{ color: '#1e293b', letterSpacing: '-1.5px', fontSize: '2.5rem' }}>
            NearbyHelper
          </h1>
          <p className="text-secondary small fw-medium">Sign in to access your dashboard</p>
        </div>

        {error && (
          <div 
            className="alert border-0 small py-2 mb-4 text-center" 
            style={{ borderRadius: '1rem', backgroundColor: 'rgba(254, 226, 226, 0.9)', color: '#991b1b' }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label small fw-bold text-secondary ms-1">Email Address</label>
            <input
              type="email"
              name="email"
              className="form-control form-control-lg border-0 shadow-sm"
              style={{ 
                borderRadius: '1rem', 
                fontSize: '0.95rem',
                backgroundColor: 'rgba(241, 245, 249, 0.9)',
                padding: '0.8rem 1.2rem'
              }}
              placeholder="name@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <div className="d-flex justify-content-between">
              <label className="form-label small fw-bold text-secondary ms-1">Password</label>
              <a href="#" className="text-decoration-none small fw-bold" style={{ color: '#4f46e5' }}>Forgot?</a>
            </div>
            <input
              type="password"
              name="password"
              className="form-control form-control-lg border-0 shadow-sm"
              style={{ 
                borderRadius: '1rem', 
                fontSize: '0.95rem',
                backgroundColor: 'rgba(241, 245, 249, 0.9)',
                padding: '0.8rem 1.2rem'
              }}
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary w-100 py-3 fw-bold shadow-lg border-0"
            style={{ 
              borderRadius: '1rem', 
              background: '#1e293b', // Darker elegant button like the reference
              color: 'white',
              letterSpacing: '0.5px',
              transition: 'all 0.3s ease'
            }}
          >
            Login
          </button>
        </form>

        <div className="text-center mt-4 pt-3 border-top" style={{ borderColor: 'rgba(0,0,0,0.05) !important' }}>
          <p className="text-secondary small mb-0 fw-medium">
            Don't have an account? {' '}
            <Link 
              to="/register" 
              className="fw-bold text-decoration-none" 
              style={{ color: '#4f46e5' }}
            >
              Register Now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;