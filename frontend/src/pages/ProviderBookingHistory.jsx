
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import API from '../utils/axios';

const ProviderBookingHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await API.get('/bookings/provider/history', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setHistory(res.data.bookings || []);
      } catch (err) {
  console.log(
  "FULL ERROR:",
  JSON.stringify(err.response?.data)
);
  console.log("STATUS:", err.response?.status);

  setError(
    err.response?.data?.msg || 
    "Failed to load booking history."
  );
} finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  return (
    <>
      <Navbar role="provider" />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">Booking History</h2>

        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && history.length === 0 && <p>No booking history available.</p>}

        {!loading && !error && history.length > 0 && (
          <ul className="space-y-4">
            {history.map((booking, index) => (
            <li key={index} className="p-4 border rounded shadow">

  <p>
    <strong>Customer Name:</strong>{" "}
    {booking.userId?.name || "N/A"}
  </p>

  <p>
    <strong>Service Category:</strong>{" "}
    {booking.providerId?.category || "N/A"}
  </p>

  <p>
    <strong>Date:</strong>{" "}
    {new Date(booking.date).toLocaleString()}
  </p>

  <p>
    <strong>Status:</strong>{" "}
    <span
      className={`font-medium ${
        booking.status === "completed"
          ? "text-green-600"
          : "text-yellow-600"
      }`}
    >
      {booking.status}
    </span>
  </p>


  {/* ⭐ CUSTOMER FEEDBACK */}
  {booking.review ? (
    <div className="mt-3 p-2 border rounded">

      <h6>Customer Feedback</h6>

      <div style={{ fontSize: "24px" }}>
  {[1, 2, 3, 4, 5].map((star) => (
    <span
      key={star}
      style={{
        color:
          star <= booking.review.rating
            ? "#ffc107"
            : "#ddd",
        marginRight: "3px"
      }}
    >
      ★
    </span>
  ))}
</div>
      <p>
        {booking.review.comment}
      </p>

    </div>
  ) : (
    booking.status === "completed" && (
      <p className="text-muted">
        No feedback received yet
      </p>
    )
  )}

</li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default ProviderBookingHistory;

