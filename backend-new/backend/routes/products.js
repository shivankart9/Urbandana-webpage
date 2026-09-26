const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

// GET /api/products              -> all products
// GET /api/products?type=tee     -> just t-shirts (feeds teeGrid)
// GET /api/products?type=cap     -> just caps (feeds capGrid)
// GET /api/products?q=warli      -> search by name (feeds the nav search box)
router.get("/", async (req, res) => {
  try {
    const filter = {};
    if (req.query.type) filter.type = req.query.type;
    if (req.query.q) filter.name = { $regex: req.query.q, $options: "i" };

    const products = await Product.find(filter).sort({ legacyId: 1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch products", error: err.message });
  }
});

// GET /api/products/:type/:legacyId  e.g. /api/products/tee/1  (feeds Quick View modal)
router.get("/:type/:legacyId", async (req, res) => {
  try {
    const { type, legacyId } = req.params;
    const product = await Product.findOne({ type, legacyId: Number(legacyId) });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch product", error: err.message });
  }
});

// POST /api/products  -> add a new product (for you/admin use, e.g. via Postman)
router.post("/", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: "Failed to create product", error: err.message });
  }
});

// PUT /api/products/:id  -> update a product by its Mongo _id
router.put("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(400).json({ message: "Failed to update product", error: err.message });
  }
});

// DELETE /api/products/:id
router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete product", error: err.message });
  }
});

module.exports = router;
