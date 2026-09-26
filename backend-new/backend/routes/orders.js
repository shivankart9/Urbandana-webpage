const express = require("express");
const { body, validationResult } = require("express-validator");
const Product = require("../models/Product");
const Order = require("../models/Order");
const { optionalAuth, requireAuth } = require("../middleware/auth");

const router = express.Router();

// POST /api/orders  -> matches checkoutForm (coName, coPhone, coAddress, coCity, coPin)
// plus the cart contents, e.g.:
// {
//   "name": "Priya Verma", "phone": "9876543210",
//   "address": "12 MG Road", "city": "Delhi", "pincode": "110001",
//   "items": [{ "type": "tee", "legacyId": 1, "qty": 2 }, { "type": "cap", "legacyId": 101, "qty": 1 }]
// }
router.post(
  "/",
  optionalAuth,
  [
    body("name").trim().notEmpty(),
    body("phone").trim().notEmpty(),
    body("address").trim().notEmpty(),
    body("city").trim().notEmpty(),
    body("pincode").trim().notEmpty(),
    body("items").isArray({ min: 1 }).withMessage("Cart is empty")
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, phone, address, city, pincode, items } = req.body;
      const paymentMethod = req.body.paymentMethod === "online" ? "online" : "cod";

      // rebuild items server-side from the DB so prices can't be tampered with
      const orderItems = [];
      let total = 0;

      for (const line of items) {
        const product = await Product.findOne({ type: line.type, legacyId: line.legacyId });
        if (!product) {
          return res.status(400).json({ message: `Product ${line.type}-${line.legacyId} not found` });
        }
        if (!product.inStock) {
          return res.status(400).json({ message: `${product.name} is out of stock` });
        }
        const qty = Math.max(1, Number(line.qty) || 1);
        orderItems.push({
          product: product._id,
          name: product.name,
          type: product.type,
          legacyId: product.legacyId,
          price: product.price,
          qty
        });
        total += product.price * qty;
      }

      const order = await Order.create({
        user: req.userId || undefined,
        items: orderItems,
        total,
        name,
        phone,
        address,
        city,
        pincode,
        paymentMethod
      });

      // COD orders are done here. Online orders still need the frontend to
      // call POST /api/payments/create-order with this order's _id next.
      res.status(201).json(order);
    } catch (err) {
      res.status(500).json({ message: "Failed to place order", error: err.message });
    }
  }
);

// GET /api/orders/mine  -> a logged-in user's own order history
router.get("/mine", requireAuth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders", error: err.message });
  }
});

// GET /api/orders/:id  -> look up one order (e.g. for an admin/order-status page)
router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch order", error: err.message });
  }
});

module.exports = router;
