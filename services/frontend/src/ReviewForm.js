import React, { useState } from "react";
import axios from "axios";

function ReviewForm({ moduleId, fetchReviews }) {
  const [showForm, setShowForm] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!moduleId) {
      alert("Select a module first!");
      return;
    }

    axios
      .post("http://localhost:3002/reviews", {
        moduleId: parseInt(moduleId, 10),
        review: reviewText,
        rating: rating,
      })
      .then(() => {
        fetchReviews();
        setReviewText("");
        setRating("");
        setShowForm(false); // Close the form after submitting
      })
      .catch((error) => console.error("Error adding review:", error));
  };

  return (
    <div>
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? "Cancel" : "Add Review"}
      </button>
      {showForm && (
        <form onSubmit={handleSubmit}>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Enter review"
            required
          />
          <input
            type="number"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            min="1"
            max="5"
            placeholder="Rating (1-5)"
            required
          />
          <button type="submit">Submit Review</button>
        </form>
      )}
    </div>
  );
}

export default ReviewForm;
