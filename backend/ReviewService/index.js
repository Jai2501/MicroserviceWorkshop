const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

// Sample Data
let reviews = [
  {
    id: 1,
    moduleId: 1,
    reviewer: "Jonathan Tan",
    review: "Excellent introduction to programming.",
    rating: 5,
  },
  {
    id: 2,
    moduleId: 1,
    reviewer: "Priya Gupta",
    review: "Good course but challenging for beginners.",
    rating: 4,
  },
  {
    id: 3,
    moduleId: 2,
    reviewer: "Gareth Yeo",
    review: "Well-structured and informative.",
    rating: 5,
  },
  {
    id: 3,
    moduleId: 3,
    reviewer: "Annabelle Chan",
    review: "A tough course!",
    rating: 3,
  },
];

// GET all reviews
app.get("/reviews", (req, res) => {
  res.status(200).send(reviews);
});

// GET reviews by module ID
app.get("/reviews/module/:moduleId", (req, res) => {
  const moduleId = parseInt(req.params.moduleId);
  const moduleReviews = reviews.filter(
    (review) => review.moduleId === moduleId
  );

  res.status(200).send(moduleReviews);
});

// POST a new review
app.post("/reviews", (req, res) => {
  const { moduleId, reviewer, review, rating } = req.body;
  const newReview = {
    id: reviews.length + 1,
    moduleId,
    reviewer,
    review,
    rating,
  };

  reviews.push(newReview);
  res.status(201).send(newReview);
});

// PUT update a review
app.put("/reviews/:id", (req, res) => {
  const reviewToUpdate = reviews.find((r) => r.id === parseInt(req.params.id));

  if (!reviewToUpdate) {
    res.status(404).send({
      error: "The review with the given ID was not found.",
    });

    return;
  }

  const { moduleId, reviewer, review, rating } = req.body;
  reviewToUpdate.moduleId = moduleId;
  reviewToUpdate.reviewer = reviewer;
  reviewToUpdate.review = review;
  reviewToUpdate.rating = rating;

  res.status(200).send(reviewToUpdate);
});

// DELETE a review
app.delete("/reviews/:id", (req, res) => {
  const reviewIndex = reviews.findIndex(
    (r) => r.id === parseInt(req.params.id)
  );

  if (reviewIndex === -1) {
    res.status(404).send({
      error: "The review with the given ID was not found.",
    });

    return;
  }

  const deletedReview = reviews.splice(reviewIndex, 1);

  res.status(200).send(deletedReview[0]);
});

const PORT = 3002;
app.listen(PORT, () => console.log(`Review service running on port ${PORT}`));
