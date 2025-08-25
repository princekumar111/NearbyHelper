


import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import API from '../utils/axios';
import { FaUsers, FaUserTie, FaClipboardList } from 'react-icons/fa';

// Import your actual components here
import AdminUsers from '../components/AdminUsers';          // Adjust path as needed
import AdminProviders from '../components/AdminProviders';  // Adjust path as needed
import AdminBookings from '../components/AdminBookings';    // Adjust path as needed

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProviders: 0,
    pendingProviders: 0,
    totalBookings: 0,
    pendingBookings: 0,
    completedBookings: 0,
  });

  const [error, setError] = useState('');
  const [activeView, setActiveView] = useState('dashboard'); // 'dashboard', 'users', 'providers', 'bookings'

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No admin token found. Please login.');
        return;
      }
      const res = await API.get('/admin/stats', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setStats(res.data);
      setError('');
    } catch (err) {
      console.error('Failed to fetch admin stats:', err);
      setError('Failed to load statistics.');
    }
  };

  return (
    <>
      <Navbar role="admin" />

      <div className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold text-primary">
            {activeView === 'dashboard'
              ? 'Admin Dashboard Overview'
              : activeView === 'users'
              ? 'Users'
              : activeView === 'providers'
              ? 'Service Providers'
              : activeView === 'bookings'
              ? 'Bookings'
              : ''}
          </h2>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        {activeView === 'dashboard' && (
          <div className="row g-4">
            {/* Total Users Card */}
            <div className="col-md-4">
              <div
                role="button"
                tabIndex={0}
                className="card shadow-sm border-0 h-100 hover-scale"
                onClick={() => setActiveView('users')}
                onKeyPress={e => { if (e.key === 'Enter') setActiveView('users'); }}
                style={{ cursor: 'pointer' }}
              >
                <div className="card-body d-flex flex-column align-items-center">
                  <FaUsers size={48} className="mb-3 text-primary" />
                  <p className="card-text display-4 mb-0 fw-bold">{stats.totalUsers}</p>
                  <h5 className="card-title fw-semibold mt-2">Total Users</h5>
                </div>
              </div>
            </div>

            {/* Service Providers Card */}
            <div className="col-md-4">
              <div
                role="button"
                tabIndex={0}
                className="card shadow-sm border-0 h-100 hover-scale"
                onClick={() => setActiveView('providers')}
                onKeyPress={e => { if (e.key === 'Enter') setActiveView('providers'); }}
                style={{ cursor: 'pointer' }}
              >
                <div className="card-body d-flex flex-column align-items-center">
                  <FaUserTie size={48} className="mb-3 text-success" />
                  <p className="card-text display-4 mb-0 fw-bold">{stats.totalProviders}</p>
                  <h5 className="card-title fw-semibold mt-2">Service Providers</h5>
                  <small className="opacity-75 mt-1">
                    Pending Approval: {stats.pendingProviders}
                  </small>
                </div>
              </div>
            </div>

            {/* Bookings Card */}
            <div className="col-md-4">
              <div
                role="button"
                tabIndex={0}
                className="card shadow-sm border-0 h-100 hover-scale"
                onClick={() => setActiveView('bookings')}
                onKeyPress={e => { if (e.key === 'Enter') setActiveView('bookings'); }}
                style={{ cursor: 'pointer' }}
              >
                <div className="card-body d-flex flex-column align-items-center">
                  <FaClipboardList size={48} className="mb-3 text-info" />
                  <p className="card-text display-4 mb-0 fw-bold">{stats.totalBookings}</p>
                  <h5 className="card-title fw-semibold mt-2">Bookings</h5>
                  <small className="opacity-75 mt-1">
                    Pending: {stats.pendingBookings} | Completed: {stats.completedBookings}
                  </small>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeView !== 'dashboard' && (
          <>
            <button
              className="btn btn-secondary mb-4"
              onClick={() => setActiveView('dashboard')}
            >
              &larr; Back to Dashboard
            </button>

            {activeView === 'users' && <AdminUsers />}
            {activeView === 'providers' && <AdminProviders />}
            {activeView === 'bookings' && <AdminBookings />}
          </>
        )}
      </div>

      <style>{`
        .hover-scale:hover {
          transform: scale(1.05);
          transition: transform 0.3s ease-in-out;
          box-shadow: 0 0.5rem 1rem rgba(0,0,0,0.15);
        }
      `}</style>
    </>
  );
};

export default AdminDashboard;

