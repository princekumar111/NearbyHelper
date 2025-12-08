import React, { useEffect, useState } from 'react';
import API from '../utils/axios';
import Navbar from '../components/Navbar';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cancellingId, setCancellingId] = useState(null);
  const [reviewData, setReviewData] = useState({});
  const [submittingId, setSubmittingId] = useState(null);

  // SAFE LOCATION FORMATTER
  const safeLocation = (provider) => {
    if (!provider) return "N/A";

    const loc = provider.location;
    if (!loc || !loc.coordinates) return "N/A";

    const [lng, lat] = loc.coordinates;
    return `Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}`;
  };

  // SAFE NAME FORMATTER
  const safeName = (provider) => {
    if (!provider) return "N/A";
    return (
      provider?.userId?.name ||
      provider?.name ||
      "N/A"
    );
  };

  const fetchBookings = async () => {
    try {
      const res = await API.get('/bookings/user');
      setBookings(res.data.bookings || []);
    } catch (err) {
      console.error('Error fetching bookings:', err.message);
      setError('Failed to load your bookings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const cancelBooking = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return;

    try {
      setCancellingId(id);
      await API.put(`/bookings/${id}/status`, { status: 'cancelled' });
      alert('Booking cancelled');
      fetchBookings();
    } catch (err) {
      alert('Failed to cancel booking');
    } finally {
      setCancellingId(null);
    }
  };

  const submitReview = async (booking) => {
    const { rating, comment } = reviewData[booking._id] || {};
    if (!rating) return alert('Rating is required');

    try {
      setSubmittingId(booking._id);
      await API.post('/reviews', {
        bookingId: booking._id,
        providerId: booking.providerId._id,
        rating,
        comment
      });

      alert('Review submitted!');
      fetchBookings();
    } catch (err) {
      alert('Failed to submit review');
    } finally {
      setSubmittingId(null);
    }
  };

  const formatStatus = (status) =>
    status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();

  return (
    <>
      <Navbar role="user" />

      <div className="container py-5">
        <h2 className="mb-4">📋 My Bookings</h2>

        {loading && <div className="alert alert-info">Loading...</div>}
        {error && <div className="alert alert-danger">{error}</div>}

        {!loading && bookings.length === 0 && (
          <div className="alert alert-warning">No bookings yet.</div>
        )}

        {bookings.map((booking) => {
          const provider = booking.provider || booking.providerId || {};

          return (
            <div key={booking._id} className="card mb-3">
              <div className="card-body">

                <h5 className="card-title">
                  {provider?.category || "Service"} –{" "}
                  <span className={`text-${
                    booking.status === "cancelled"
                      ? "danger"
                      : booking.status === "completed"
                      ? "success"
                      : "primary"
                  }`}>
                    {formatStatus(booking.status)}
                  </span>
                </h5>

                <p className="card-text">
                  <strong>Name:</strong> {safeName(provider)} <br />
                  <strong>Contact:</strong> {provider?.contact || "N/A"} <br />
                  <strong>Location:</strong> {safeLocation(provider)} <br />
                  <strong>Date:</strong> {new Date(booking.date).toLocaleString()}
                </p>

                {/* CANCEL */}
                {["pending", "confirmed"].includes(booking.status.toLowerCase()) && (
                  <button
                    onClick={() => cancelBooking(booking._id)}
                    className="btn btn-danger"
                    disabled={cancellingId === booking._id}
                  >
                    {cancellingId === booking._id ? "Cancelling..." : "Cancel Booking"}
                  </button>
                )}

                {/* REVIEW FORM */}
                {booking.status === "completed" && !booking.hasReview && (
                  <div className="mt-3">
                    <h6>📝 Leave a Review</h6>

                    <input
                      type="number"
                      className="form-control"
                      min={1}
                      max={5}
                      value={reviewData[booking._id]?.rating || ""}
                      onChange={(e) =>
                        setReviewData({
                          ...reviewData,
                          [booking._id]: {
                            ...reviewData[booking._id],
                            rating: e.target.value,
                          },
                        })
                      }
                    />

                    <textarea
                      className="form-control mt-2"
                      rows={2}
                      value={reviewData[booking._id]?.comment || ""}
                      onChange={(e) =>
                        setReviewData({
                          ...reviewData,
                          [booking._id]: {
                            ...reviewData[booking._id],
                            comment: e.target.value,
                          },
                        })
                      }
                    ></textarea>

                    <button
                      className="btn btn-success mt-2"
                      onClick={() => submitReview(booking)}
                      disabled={submittingId === booking._id}
                    >
                      {submittingId === booking._id ? "Submitting..." : "Submit Review"}
                    </button>
                  </div>
                )}

                {booking.status === "completed" && booking.hasReview && (
                  <p className="text-success mt-3">
                    ✅ You have already reviewed this booking.
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default MyBookings;
