
import React, { useEffect, useState, useMemo, useCallback } from 'react';
import API from '../utils/axios';
import Navbar from '../components/Navbar';

const ProviderDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updatingId, setUpdatingId] = useState(null);

  const token = localStorage.getItem('token');

  const config = useMemo(() => ({
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }), [token]);

  const fetchBookings = useCallback(async () => {
    try {
      const res = await API.get('/providers/dashboard/upcoming', config);
      console.log(res.data.upcomingBookings);
      setBookings(res.data.upcomingBookings);

    } catch (err) {
      console.error(err);
      setError('Failed to fetch bookings.');
    } finally {
      setLoading(false);
    }
  }, [config]);

  const updateStatus = async (bookingId, status) => {
    if (!window.confirm(`Are you sure you want to mark this as '${status}'?`)) return;

    try {
      setUpdatingId(bookingId);
      await API.put(`/bookings/${bookingId}/status`, { status }, config);
      fetchBookings(); // Refresh after update
    } catch (err) {
      console.error('Status update failed:', err);
      alert('Failed to update status');
    } finally {
      setUpdatingId(null);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending': return 'badge bg-secondary';
      case 'confirmed': return 'badge bg-info text-dark';
      case 'completed': return 'badge bg-success';
      case 'cancelled': return 'badge bg-danger';
      default: return 'badge bg-dark';
    }
  };

  return (
    <>
      <Navbar role="provider" />
      <div className="container py-4">
        <h2 className="mb-4">📅 Upcoming Bookings</h2>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <div className="alert alert-danger">{error}</div>
        ) : bookings.length === 0 ? (
          <p>No upcoming bookings found.</p>
        ) : (
          bookings.map((booking) => (
            <div className="card mb-3 shadow-sm p-3" key={booking._id}>
              <h5>👤 {booking.userId?.name}</h5>
              <p>📧 {booking.userId?.email}</p>
              <p>🗓 {new Date(booking.date).toLocaleString()}</p>
              <p>📝 {booking.description || 'No description provided'}</p>
              <p>
                📌 Status:{' '}
                <span className={getStatusBadge(booking.status)}>
                  {booking.status.toUpperCase()}
                </span>
              </p>

              {['pending', 'confirmed'].includes(booking.status) && (
                <div className="mt-2 d-flex gap-2 flex-wrap">
                  {booking.status === 'pending' && (
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => updateStatus(booking._id, 'confirmed')}
                      disabled={updatingId === booking._id}
                    >
                      ✅ Confirm
                    </button>
                  )}
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => updateStatus(booking._id, 'completed')}
                    disabled={updatingId === booking._id}
                  >
                    ✔ Mark as Completed
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => updateStatus(booking._id, 'cancelled')}
                    disabled={updatingId === booking._id}
                  >
                    ✖ Cancel
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default ProviderDashboard;




