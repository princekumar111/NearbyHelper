// src/pages/BookingPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../utils/axios';

const BookingPage = () => {
  const { providerId } = useParams();
  const navigate = useNavigate();

  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [description, setDescription] = useState('');
  const [alert, setAlert] = useState('');

  useEffect(() => {
    const fetchProvider = async () => {
      try {
        const res = await API.get(`/providers/${providerId}`);
        setProvider(res.data);
        setError('');
      } catch (err) {
        console.error(err);
        setError('Failed to load provider details');
      } finally {
        setLoading(false);
      }
    };

    fetchProvider();
  }, [providerId]);

  const handleBooking = async (e) => {
    e.preventDefault();

    if (!appointmentDate || !appointmentTime) {
      setAlert('⚠️ Please select a valid date and time.');
      return;
    }

    try {
      const combinedDate = new Date(`${appointmentDate}T${appointmentTime}`);
      await API.post('/bookings', {
        providerId: provider._id,
        date: combinedDate.toISOString(),
        description:  description || `Booking for ${provider.category || 'service'}`
      });

      setAlert(' Booking successful! Redirecting...');
      setTimeout(() => {
        navigate('/user/dashboard');
      }, 1000);
    } catch (err) {
      console.error(err);
      setAlert(' Failed to create booking.');
    }
  };

  if (loading) return <div className="container py-5">Loading provider...</div>;
  if (error) return <div className="container py-5 alert alert-danger">{error}</div>;

  return (
    <div className="container py-5">
      <h2>Book an Appointment with {provider.userId?.name || 'Provider'}</h2>
      {alert && <div className="alert alert-info">{alert}</div>}

      <div className="card shadow-sm p-4 mt-4">
        <h5>Service: {provider.category}</h5>
        <p>Location: {provider.location}</p>
        <p>Contact: {provider.contact}</p>
        {/* <p>Description: {provider.description}</p> */}

        <form onSubmit={handleBooking}>
          <div className="mb-3">
            <label className="form-label">Select Date</label>
            <input
              type="date"
              className="form-control"
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Select Time</label>
            <input
              type="time"
              className="form-control"
              value={appointmentTime}
              onChange={(e) => setAppointmentTime(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
  <label className="form-label">Description</label>
  <textarea
    className="form-control"
    rows="3"
    placeholder="Enter description for your booking..."
    value={description}
    onChange={(e) => setDescription(e.target.value)}
  ></textarea>
</div>


          <button type="submit" className="btn btn-primary">Book Appointment</button>
        </form>
      </div>
    </div>
  );
};

export default BookingPage;

