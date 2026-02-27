import React, { useEffect, useState } from "react";
import API from "../utils/axios";
import "./BookingPage.css";

const BookingPage = ({ providerId, onClose }) => {
  const [provider, setProvider] = useState(null);
  const [appointmentDate, setAppointmentDate] = useState("");
  const [description, setDescription] = useState("");
  const [alert, setAlert] = useState("");

  const [hour, setHour] = useState("09");
  const [minute, setMinute] = useState("00");
  const [ampm, setAmPm] = useState("AM");

  useEffect(() => {
    const fetchProvider = async () => {
      const res = await API.get(`/providers/${providerId}`);
      setProvider(res.data);
    };
    fetchProvider();
  }, [providerId]);

  const get24HourTime = () => {
    let h = parseInt(hour);
    if (ampm === "PM" && h < 12) h += 12;
    if (ampm === "AM" && h === 12) h = 0;
    return `${h.toString().padStart(2, "0")}:${minute}`;
  };

  const handleBooking = async (e) => {
    e.preventDefault();

    if (!appointmentDate) {
      setAlert("⚠️ Select date & time");
      return;
    }

    try {
      await API.post("/bookings", {
        providerId,
        date: new Date(`${appointmentDate}T${get24HourTime()}`).toISOString(),
        description,
      });

      setAlert("✅ Booking successful!");
      setTimeout(onClose, 1200);
    } catch {
      setAlert("❌ Booking failed");
    }
  };

  return (
    <div className="booking-card">
      <button className="close-btn" onClick={onClose}>
        ✕
      </button>

      <h3 className="text-center">Book Appointment</h3>
      <p className="text-center text-muted mb-4">
        {provider?.userId?.name} — {provider?.category}
      </p>

      {alert && <div className="alert alert-info">{alert}</div>}

      <form onSubmit={handleBooking}>
        <label className="form-label">Date</label>
        <input
          type="date"
          className="form-control mb-3"
          value={appointmentDate}
          onChange={(e) => setAppointmentDate(e.target.value)}
          min={new Date().toISOString().split("T")[0]}
        />

        <label className="form-label">Time</label>
        <div className="d-flex gap-2 mb-3">
          <select className="form-select" value={hour} onChange={(e) => setHour(e.target.value)}>
            {[...Array(12)].map((_, i) => {
              const h = (i + 1).toString().padStart(2, "0");
              return <option key={h}>{h}</option>;
            })}
          </select>

          <select className="form-select" value={minute} onChange={(e) => setMinute(e.target.value)}>
            <option>00</option>
            <option>30</option>
          </select>

          <select className="form-select" value={ampm} onChange={(e) => setAmPm(e.target.value)}>
            <option>AM</option>
            <option>PM</option>
          </select>
        </div>

        <label className="form-label">Description</label>
        <textarea
          className="form-control mb-3"
          rows="3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button className="btn btn-primary w-100">Confirm Booking</button>
      </form>
    </div>
  );
};

export default BookingPage;
