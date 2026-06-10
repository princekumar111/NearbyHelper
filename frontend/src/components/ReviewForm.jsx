// components/ReviewForm.jsx
import React, { useState } from 'react';
import API from '../utils/axios';

const ReviewForm = ({ booking, onReviewSubmit }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

const handleSubmit = async () => {
  try {

    if (!booking) {
      alert("❌ Booking data missing");
      return;
    }

    const provider =
      booking.providerId?._id || booking.providerId;

    if (!provider) {
      alert("❌ Provider not found");
      return;
    }

    setSubmitting(true);

    await API.post('/reviews', {
      bookingId: booking._id,
      providerId: provider,
      rating,
      comment,
    });

    alert('✅ Review submitted!');

    if (onReviewSubmit) {
      onReviewSubmit();
    }

  } catch (err) {
    alert('❌ Failed to submit review');
    console.error(err);

  } finally {
    setSubmitting(false);
  }
};

  return (
    <div className="mt-3">
      <h6>Leave a Review</h6>
      <div className="mb-2">
  {[1, 2, 3, 4, 5].map((star) => (
    <span
      key={star}
      onClick={() => setRating(star)}
      style={{
        cursor: "pointer",
        fontSize: "30px",
        color: star <= rating ? "#ffc107" : "#ccc"
      }}
    >
      ★
    </span>
  ))}
</div>
      <textarea
        className="form-control mb-2"
        placeholder="Write a comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows={3}
      />
      <button
        className="btn btn-success"
        onClick={handleSubmit}
        disabled={submitting}
      >
        {submitting ? 'Submitting...' : 'Submit Review'}
      </button>
    </div>
  );
};

export default ReviewForm;
