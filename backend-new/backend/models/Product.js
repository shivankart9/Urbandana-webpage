const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    // legacy numeric id from the old front-end arrays (1,2,3... / 101,102...)
    // kept so existing cart/fav keys like "tee-1" or "cap-101" keep working
    legacyId: { type: Number, required: true },
    type: { type: String, enum: ["tee", "cap"], required: true },
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    inStock: { type: Boolean, default: true },
    images: { type: [String], default: [] },
    description: { type: String, default: "" }
  },
  { timestamps: true }
);

// a product is uniquely identified by its type + legacy id, e.g. tee-1, cap-101
productSchema.index({ type: 1, legacyId: 1 }, { unique: true });

module.exports = mongoose.model("Product", productSchema);
