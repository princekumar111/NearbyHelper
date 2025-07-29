import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isLoggedIn, logout, getUserFromToken } from '../utils/auth';
import Navbar from '../components/Navbar';
import API from '../utils/axios';

const UserDashboard = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');
  const user = getUserFromToken();
  const navigate = useNavigate(); // 👈 used to redirect

  // 🔒 Protect this component on mount
  useEffect(() => {
    if (!isLoggedIn()) {
      logout(); // clear token & redirect to /login
    }
  }, []);

  // Fetch service categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await API.get('/categories');
        setCategories(res.data);
      } catch (err) {
        setError('Failed to load categories.');
        console.error(err);
      }
    };

    fetchCategories();
  }, []);

  // Handle "Book" button click
  const handleBookClick = (categoryName) => {
    navigate(`/providers/${categoryName.toLowerCase()}`);
  };

  return (
    <>
      <Navbar role="user" />
      <div className="container py-5">
        <h2>Welcome, {user?.name || 'User'}!</h2>
        {error && <div className="alert alert-danger">{error}</div>}

        <h4 className="mt-4">Browse Services</h4>
        <div className="row mt-3">
          {categories.length > 0 ? (
            categories.map((cat) => (
              <div className="col-md-4 mb-4" key={cat._id}>
                <div className="card p-3 shadow-sm text-center h-100 d-flex flex-column justify-content-between">
                  <div>
                    <div className="display-4">{cat.icon || '🔧'}</div>
                    <h5 className="mt-2">{cat.name}</h5>
                  </div>
                  <button
                    className="btn btn-primary mt-3"
                    onClick={() => handleBookClick(cat.name)}
                  >
                    View Worker
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-muted">No categories available.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
