import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../utils/axios";
import "./BookingPage.css";

const BookingPage = () => {
  const { providerId } = useParams();
  const navigate = useNavigate();
  const [provider, setProvider] = useState(null);
  const [appointmentDate, setAppointmentDate] = useState("");
  const [description, setDescription] = useState("");
  const [alert, setAlert] = useState("");

  const [hour, setHour] = useState("09");
  const [minute, setMinute] = useState("00");
  const [ampm, setAmPm] = useState("AM");

 useEffect(() => {
  const fetchProvider = async () => {
    try {

      const res = await API.get(
        `/providers/${providerId}`
      );

      setProvider(res.data);

    } catch(error){
      console.log(error);
    }
  };

  if(providerId){
    fetchProvider();
  }

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

  // selected date + time
  const selectedDateTime = new Date(
    `${appointmentDate}T${get24HourTime()}`
  );

  const currentDateTime = new Date();

  // prevent past booking
  if (selectedDateTime <= currentDateTime) {
    setAlert("⚠️ You cannot book appointment in past time");
    return;
  }

  try {
    await API.post("/bookings", {
      providerId,
      date: selectedDateTime.toISOString(),
      description,
    });

    setAlert("✅ Booking successful!");

     setTimeout(() => {
     navigate("/user/bookings");
     }, 1200);

  } catch (error) {

  console.log("BOOKING ERROR:", error.response?.data);

  const message =
    error.response?.data?.message ||
    error.response?.data?.msg ||
    "";

  if (message.toLowerCase().includes("already")) {

    setAlert(
      "😊 You already booked this service. Please check your bookings."
    );

    setTimeout(() => {
      navigate("/user/bookings");
    }, 2000);

  } else {

    setAlert(
      message || "⚠️ Unable to complete booking right now."
    );

  }
}
};

  return (
    <div className="booking-card">
      <button 
             className="close-btn" 
             onClick={() => navigate(-1)}
            >
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

         <select 
          className="form-select" 
            value={minute} 
                onChange={(e) => setMinute(e.target.value)}
>
                   {[...Array(60)].map((_, i) => {
                     const m = i.toString().padStart(2, "0");
                      return <option key={m}>{m}</option>;
                    })}
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
