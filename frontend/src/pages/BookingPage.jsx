import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../utils/axios";

const BookingPage = () => {
  const { providerId } = useParams();
  const navigate = useNavigate();

  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState(""); // 24h format HH:mm
  const [description, setDescription] = useState("");
  const [alert, setAlert] = useState("");

  const [hour, setHour] = useState("09");
  const [minute, setMinute] = useState("00");
  const [ampm, setAmPm] = useState("AM");

  const [bookedTimes, setBookedTimes] = useState([]);

  // Fetch provider
  useEffect(() => {
    const fetchProvider = async () => {
      try {
        const res = await API.get(`/providers/${providerId}`);
        setProvider(res.data);
        setError("");
      } catch (err) {
        console.error(err);
        setError("Failed to load provider details");
      } finally {
        setLoading(false);
      }
    };
    fetchProvider();
  }, [providerId]);

  // Fetch existing bookings for selected date
  useEffect(() => {
    const fetchBookedTimes = async () => {
      if (!appointmentDate) return;
      try {
        const res = await API.get(`/bookings/provider/${providerId}?date=${appointmentDate}`);
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

  // Convert dropdowns to valid 24h time (without calling set during render)
  const get24HourTime = (h, m, ap) => {
    let hourNum = parseInt(h, 10);
    if (ap === "PM" && hourNum < 12) hourNum += 12;
    if (ap === "AM" && hourNum === 12) hourNum = 0;
    return `${hourNum.toString().padStart(2, "0")}:${m}`;
  };

  // Update appointmentTime whenever dropdowns change
  useEffect(() => {
    setAppointmentTime(get24HourTime(hour, minute, ampm));
  }, [hour, minute, ampm]);

  const handleBooking = async (e) => {
    e.preventDefault();

    if (!appointmentDate || !appointmentTime) {
      setAlert("⚠️ Please select a valid date and time.");
      return;
    }

    // Validate time (9 AM – 5 PM)
    const [hours, minutes] = appointmentTime.split(":").map(Number);
    if (hours < 9 || (hours > 17 || (hours === 17 && minutes > 0))) {
      setAlert("⚠️ Bookings are allowed only between 9:00 AM and 5:00 PM.");
      return;
    }

    // Check if slot already booked
    if (bookedTimes.includes(appointmentTime)) {
      setAlert("⚠️ This time slot is already booked. Please choose another.");
      return;
    }

    try {
      const combinedDate = new Date(`${appointmentDate}T${appointmentTime}`);
      await API.post("/bookings", {
        providerId: provider._id,
        date: combinedDate.toISOString(),
        description:
          description || `Booking for ${provider.category || "service"}`,
      });

      setAlert("✅ Booking successful! Redirecting...");
      setTimeout(() => {
        navigate("/user/dashboard");
      }, 1000);
    } catch (err) {
      console.error(err);
      setAlert("❌ Failed to create booking.");
    }
  };

  if (loading) return <div className="container py-5">Loading provider...</div>;
  if (error) return <div className="container py-5 alert alert-danger">{error}</div>;

  return (
    <div className="container py-5">
      <h2>Book an Appointment with {provider.userId?.name || "Provider"}</h2>
      {alert && <div className="alert alert-info">{alert}</div>}

      <div className="card shadow-sm p-4 mt-4">
        <h5>Service: {provider.category}</h5>
        <p>Location: {provider.location}</p>
        <p>Contact: {provider.contact}</p>

        <form onSubmit={handleBooking}>
          {/* Date Picker */}
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

          {/* Custom Time Picker */}
          <div className="mb-3">
            <label className="form-label">Select Time (9 AM - 5 PM)</label>
            <div className="d-flex">
              {/* Hour */}
              <select
                className="form-select me-2"
                value={hour}
                onChange={(e) => setHour(e.target.value)}
              >
                {[...Array(12)].map((_, i) => {
                  const h = (i + 1).toString().padStart(2, "0");
                  return <option key={h} value={h}>{h}</option>;
                })}
              </select>

              {/* Minute */}
              <select
                className="form-select me-2"
                value={minute}
                onChange={(e) => setMinute(e.target.value)}
              >
                {["00", "30"].map((m) => {
                  const timeCheck = get24HourTime(hour, m, ampm);
                  return (
                    <option key={m} value={m} disabled={bookedTimes.includes(timeCheck)}>
                      {m}
                    </option>
                  );
                })}
              </select>

              {/* AM/PM */}
              <select
                className="form-select"
                value={ampm}
                onChange={(e) => setAmPm(e.target.value)}
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
          </div>

          {/* Description */}
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

          <button type="submit" className="btn btn-primary">
            Book Appointment
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingPage;
