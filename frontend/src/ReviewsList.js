import React from "react";

function ReviewsList({ moduleCode, reviews }) {
  return (
    <div>
      <h2>{moduleCode} Reviews</h2>
      {reviews.map((reviewData, index) => (
        <div key={index} className="review">
          <p>Review: {reviewData.review}</p>
          <p>Rating: {reviewData.rating}</p>
        </div>
      ))}
    </div>
  );
}

export default ReviewsList;
