
import React, { useEffect, useState } from 'react';
import API from '../utils/axios';
// import Navbar from '../components/Navbar';
const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No token found. Please login.');
        return;
      }

      const res = await API.get('/admin/bookings', {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(res.data);
      setBookings(res.data);
      setError('');
    } catch (err) {
      console.error('Error fetching bookings:', err);
      if (err.response?.status === 401) {
        alert('Session expired. Please log in again.');
        localStorage.removeItem('adminToken');
        window.location.href = '/login';
      } else {
        setError('Failed to load bookings.');
      }
    }
  };

  return (
    <> 
    <div className="container py-5">
      <h3 className="mb-4">Manage Bookings</h3>

      {error && <div className="alert alert-danger">{error}</div>}

      <table className="table table-bordered table-hover shadow-sm">
        <thead className="table-primary">
          <tr>
            <th>User</th>
            <th>Provider</th>
            <th>Date</th>
            <th>Description</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <tr key={booking._id}>
                <td>{booking.userId?.name || 'N/A'}</td>
                <td>{booking.providerId?.name || 'N/A'}</td>
                <td>{new Date(booking.date).toLocaleDateString()}</td>
                <td>{booking.description || '—'}</td>
                <td className="text-capitalize">{booking.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No bookings found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default AdminBookings;
