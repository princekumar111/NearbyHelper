

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../utils/axios';

const BookingPage = () => {
  const { providerId } = useParams();
  const navigate = useNavigate();

  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);
<<<<<<< HEAD
  const [error, setError] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [description, setDescription] = useState('');
  const [alert, setAlert] = useState('');

  // ✅ SAFE LOCATION FORMATTER
  // const formatLocation = (location) => {
  //   if (!location || !location.coordinates) return "Not available";
=======
  const [error, setError] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState(""); 
  const [description, setDescription] = useState("");
  const [alert, setAlert] = useState("");

  // Custom Time Picker State
  const [hour, setHour] = useState("09");
  const [minute, setMinute] = useState("00");
  const [ampm, setAmPm] = useState("AM");
>>>>>>> 0b584ca3 (new)

  //   const [lng, lat] = location.coordinates;
  //   return `Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}`;
  // };

<<<<<<< HEAD
=======
  // Fetch provider details
>>>>>>> 0b584ca3 (new)
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

<<<<<<< HEAD
=======
  // Fetch booked time slots for selected date
  useEffect(() => {
    const fetchBookedTimes = async () => {
      if (!appointmentDate) return;
      try {
        const res = await API.get(
          `/bookings/provider/${providerId}?date=${appointmentDate}`
        );
        const times = res.data.map((b) =>
          new Date(b.date).toTimeString().slice(0, 5)
        );
        setBookedTimes(times);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBookedTimes();
  }, [appointmentDate, providerId]);

  // Convert dropdown values to 24-hour time
  const get24HourTime = (h, m, ap) => {
    let hourNum = parseInt(h, 10);
    if (ap === "PM" && hourNum < 12) hourNum += 12;
    if (ap === "AM" && hourNum === 12) hourNum = 0;
    return `${hourNum.toString().padStart(2, "0")}:${m}`;
  };

  useEffect(() => {
    setAppointmentTime(get24HourTime(hour, minute, ampm));
  }, [hour, minute, ampm]);

  // Handle booking
>>>>>>> 0b584ca3 (new)
  const handleBooking = async (e) => {
    e.preventDefault();

    if (!appointmentDate || !appointmentTime) {
<<<<<<< HEAD
      setAlert('⚠️ Please select a valid date and time.');
=======
      setAlert("⚠️ Please select a valid date and time.");
      return;
    }

    const [hours, minutes] = appointmentTime.split(":").map(Number);
    if (hours < 9 || (hours > 17 || (hours === 17 && minutes > 0))) {
      setAlert("⚠️ Bookings are allowed only between 9:00 AM and 5:00 PM.");
      return;
    }

    if (bookedTimes.includes(appointmentTime)) {
      setAlert("⚠️ This time slot is already booked. Please choose another.");
>>>>>>> 0b584ca3 (new)
      return;
    }

    try {
      const combinedDate = new Date(`${appointmentDate}T${appointmentTime}`);

<<<<<<< HEAD
      await API.post('/bookings', {
        providerId: provider._id,
        date: combinedDate.toISOString(),
        description: description || `Booking for ${provider.category || 'service'}`
      });

      setAlert(' Booking successful! Redirecting...');
      setTimeout(() => navigate('/user/dashboard'), 1000);

=======
      await API.post("/bookings", {
        providerId: provider._id,
        date: combinedDate.toISOString(),
        description: description || `Booking for ${provider.category || "service"}`,
      });

      setAlert("✅ Booking successful! Redirecting...");
      setTimeout(() => navigate("/user/dashboard"), 1000);
>>>>>>> 0b584ca3 (new)
    } catch (err) {
      console.error(err);
      setAlert(' Failed to create booking.');
    }
  };

  if (loading)
    return <div className="container py-5">Loading provider...</div>;

  if (error)
    return <div className="container py-5 alert alert-danger">{error}</div>;

  return (
    <div className="container py-5">
<<<<<<< HEAD
      <h2>Book an Appointment with {provider.userId?.name || 'Provider'}</h2>
=======
      <h2>
        Book an Appointment with {provider.userId?.name || "Provider"}
      </h2>
>>>>>>> 0b584ca3 (new)

      {alert && <div className="alert alert-info">{alert}</div>}

      <div className="card shadow-sm p-4 mt-4">
        <h5>Service: {provider.category}</h5>
<<<<<<< HEAD

        {/* ✅ FIXED: SAFE LOCATION RENDER */}
        {/* <p><strong>Location:</strong> {formatLocation(provider.location)}</p> */}

        {/* <p><strong>Contact:</strong> {provider.contact}</p> */}

        <form onSubmit={handleBooking}>

          {/* DATE */}
=======

        <form onSubmit={handleBooking}>
          {/* DATE PICKER */}
>>>>>>> 0b584ca3 (new)
          <div className="mb-3">
            <label className="form-label">Select Date</label>
            <input
              type="date"
              className="form-control"
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              required
            />
          </div>

<<<<<<< HEAD
          {/* TIME */}
          <div className="mb-3">
            <label className="form-label">Select Time</label>
            <input
              type="time"
              className="form-control"
              value={appointmentTime}
              onChange={(e) => setAppointmentTime(e.target.value)}
              required
            />
=======
          {/* CUSTOM TIME PICKER */}
          <div className="mb-3">
            <label className="form-label">Select Time (9 AM - 5 PM)</label>
            <div className="d-flex">
              <select
                className="form-select me-2"
                value={hour}
                onChange={(e) => setHour(e.target.value)}
              >
                {[...Array(12)].map((_, i) => {
                  const h = (i + 1).toString().padStart(2, "0");
                  return (
                    <option key={h} value={h}>
                      {h}
                    </option>
                  );
                })}
              </select>

              <select
                className="form-select me-2"
                value={minute}
                onChange={(e) => setMinute(e.target.value)}
              >
                {["00", "30"].map((m) => {
                  const timeCheck = get24HourTime(hour, m, ampm);
                  return (
                    <option
                      key={m}
                      value={m}
                      disabled={bookedTimes.includes(timeCheck)}
                    >
                      {m}
                    </option>
                  );
                })}
              </select>

              <select
                className="form-select"
                value={ampm}
                onChange={(e) => setAmPm(e.target.value)}
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
>>>>>>> 0b584ca3 (new)
          </div>

          {/* DESCRIPTION */}
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              rows="3"
              placeholder="Enter description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <button type="submit" className="btn btn-primary">
            Book Appointment
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingPage;
