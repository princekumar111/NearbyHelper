// components/ReviewForm.jsx
import React, { useState } from 'react';
import API from '../utils/axios';

const ReviewForm = ({ booking, onReviewSubmit }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      await API.post('/reviews', {
        bookingId: booking._id,
        providerId: booking.providerId._id || booking.providerId,
        rating,
        comment,
      });
      alert('✅ Review submitted!');
      onReviewSubmit(); // Refresh booking list
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
      <select
        value={rating}
        onChange={(e) => setRating(parseInt(e.target.value))}
        className="form-select mb-2"
      >
        {[5, 4, 3, 2, 1].map((star) => (
          <option key={star} value={star}>
            {star} Star{star > 1 && 's'}
          </option>
        ))}
      </select>
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
