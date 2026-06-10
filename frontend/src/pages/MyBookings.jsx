




import React, { useEffect, useState } from "react";
import API from "../utils/axios";
import Navbar from "../components/Navbar";
import "./MyBooking.css";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cancellingId, setCancellingId] = useState(null);
  const [reviewData, setReviewData] = useState({});
  const [submittingId, setSubmittingId] = useState(null);

  // SAFE HELPERS
  const safeName = (provider) =>
    provider?.userId?.name || provider?.name || "N/A";

  const safeLocation = (provider) => {
    if (!provider?.location?.coordinates) return "N/A";
    const [lng, lat] = provider.location.coordinates;
    return `Lat ${lat.toFixed(3)}, Lng ${lng.toFixed(3)}`;
  };

  // FETCH BOOKINGS
  const fetchBookings = async () => {
    try {
      const res = await API.get("/bookings/user");
      setBookings(res.data.bookings || []);
    } catch {
      setError("Failed to load your bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // CANCEL
  const cancelBooking = async (id) => {
    if (!window.confirm("Cancel this booking?")) return;
    try {
      setCancellingId(id);
      await API.put(`/bookings/${id}/status`, { status: "cancelled" });
      fetchBookings();
    } finally {
      setCancellingId(null);
    }
  };

  // REVIEW

const submitReview = async (booking) => {

  console.log("BOOKING DATA:", booking); // 👈 ADD HERE

  const { rating, comment } = reviewData[booking._id] || {};

  if (!rating) {
    alert("Rating required");
    return;
  }

  const provider =
    booking.providerId?._id ||
    booking.providerId ||
    booking.provider?._id;

  if (!provider) {
    alert("Provider not found");
    return;
  }

  try {
    setSubmittingId(booking._id);

    await API.post("/reviews", {
      bookingId: booking._id,
      providerId: provider,
      rating,
      comment,
    });

    fetchBookings();

  } catch (err) {
    console.error(err);
    alert("Review failed");

  } finally {
    setSubmittingId(null);
  }
};

  const statusBadge = (status) => {
    if (status === "completed") return "success";
    if (status === "cancelled") return "danger";
    if (status === "confirmed") return "primary";
    return "secondary";
  };

  return (
    <>
      <Navbar role="user" />

      <div className="container py-5">
        <h3 className="mb-4">📋 My Bookings</h3>

        {loading && <div className="alert alert-info">Loading...</div>}
        {error && <div className="alert alert-danger">{error}</div>}

        {!loading && bookings.length === 0 && (
          <div className="alert alert-warning">No bookings yet.</div>
        )}

        {bookings.map((booking) => {
          const provider = booking.provider || booking.providerId || {};

          return (
            <div key={booking._id} className="booking-card card mb-4 shadow-sm">
              <div className="card-body">
                {/* HEADER */}
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="mb-0">
                    {provider.category || "Service"}
                  </h5>
                  <span className={`badge bg-${statusBadge(booking.status)}`}>
                    {booking.status.toUpperCase()}
                  </span>
                </div>

                {/* DETAILS */}
                <div className="row booking-details">
                  <div className="col-md-6">
                    <p>
                      <strong>Name:</strong> {safeName(provider)}
                    </p>

                    {/* 📞 CONTACT — ONLY WHEN CONFIRMED */}
                    {booking.status === "confirmed" && (
                      <p>
                        <strong>Contact:</strong>{" "}
                        <span className="text-success fw-semibold">
                          {provider?.contact || "N/A"}
                        </span>
                      </p>
                    )}

                    {/* Hint for pending */}
                    {booking.status === "pending" && (
                      <p className="text-muted small">
                        📞 Contact details will be shared after confirmation
                      </p>
                    )}
                  </div>

                  <div className="col-md-6">
                    <p>
                      <strong>Location:</strong> {safeLocation(provider)}
                    </p>
                    <p>
                      <strong>Date:</strong>{" "}
                      {new Date(booking.date).toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* ACTIONS */}
                {["pending", "confirmed"].includes(
                  booking.status?.toLowerCase()
                ) && (
                  <button
                    className="btn btn-outline-danger btn-sm mt-2"
                    onClick={() => cancelBooking(booking._id)}
                    disabled={cancellingId === booking._id}
                  >
                    {cancellingId === booking._id
                      ? "Cancelling..."
                      : "Cancel Booking"}
                  </button>
                )}

                {/* REVIEW */}
                {booking.status === "completed" && !booking.hasReview && (
                  <div className="review-box mt-4">
                    <h6>Share Your Feedback</h6>

                    <div className="mb-2">
  {[1,2,3,4,5].map((star)=>(
    <span
      key={star}
      onClick={() =>
        setReviewData({
          ...reviewData,
          [booking._id]: {
            ...reviewData[booking._id],
            rating: star,
          },
        })
      }
      style={{
        fontSize:"32px",
        cursor:"pointer",
        color:
          star <= (reviewData[booking._id]?.rating || 0)
          ? "#ffc107"
          : "#ccc"
      }}
    >
      ★
    </span>
  ))}
</div>

                    <textarea
                      className="form-control mb-2"
                      rows={2}
                      placeholder="Write your review..."
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
                    />

                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => submitReview(booking)}
                      disabled={submittingId === booking._id}
                    >
                      {submittingId === booking._id
                        ? "Submitting..."
                        : "Send Feedback"}
                    </button>
                  </div>
                )}

                {booking.status === "completed" && booking.hasReview && (
                  <p className="text-success mt-3">
                    ✅ Review already submitted
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


