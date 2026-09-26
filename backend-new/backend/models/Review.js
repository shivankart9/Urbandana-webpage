const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    stars: { type: Number, required: true, min: 1, max: 5 },
    text: { type: String, required: true, trim: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" } // optional, if logged in
  },
  { timestamps: true } // createdAt replaces the old client-side "date" string
);

module.exports = mongoose.model("Review", reviewSchema);
