const express = require("express");
const { body, validationResult } = require("express-validator");
const Review = require("../models/Review");
const { optionalAuth } = require("../middleware/auth");

const router = express.Router();

// GET /api/reviews  -> feeds reviewGrid, newest first
router.get("/", async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch reviews", error: err.message });
  }
});

// POST /api/reviews  -> matches reviewForm (name, stars, text)
router.post(
  "/",
  optionalAuth,
  [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("stars").isInt({ min: 1, max: 5 }).withMessage("Stars must be 1-5"),
    body("text").trim().notEmpty().withMessage("Review text is required")
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, stars, text } = req.body;
      const review = await Review.create({
        name,
        stars,
        text,
        user: req.userId || undefined
      });
      res.status(201).json(review);
    } catch (err) {
      res.status(500).json({ message: "Failed to submit review", error: err.message });
    }
  }
);

module.exports = router;
