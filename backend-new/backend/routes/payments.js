const express = require("express");
const crypto = require("crypto");
const Razorpay = require("razorpay");
const Order = require("../models/Order");

const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// POST /api/payments/create-order
// Call this right after POST /api/orders, when paymentMethod === "online".
// body: { "orderId": "<the Mongo _id returned by POST /api/orders>" }
// Returns what your frontend needs to open Razorpay Checkout.
router.post("/create-order", async (req, res) => {
  try {
    const { orderId } = req.body;
    if (!orderId) return res.status(400).json({ message: "orderId is required" });

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });
    if (order.paymentMethod !== "online") {
      return res.status(400).json({ message: "This order is not set up for online payment" });
    }
    if (order.paymentStatus === "paid") {
      return res.status(400).json({ message: "This order is already paid" });
    }

    const razorpayOrder = await razorpay.orders.create({
      amount: Math.round(order.total * 100), // Razorpay wants paise, not rupees
      currency: "INR",
      receipt: String(order._id),
      notes: { orderId: String(order._id) }
    });

    order.razorpayOrderId = razorpayOrder.id;
    await order.save();

    res.json({
      razorpayOrderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      keyId: process.env.RAZORPAY_KEY_ID, // safe to expose — this is the public key
      orderId: order._id
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to create payment order", error: err.message });
  }
});

// POST /api/payments/verify
// Call this from the Razorpay Checkout "handler" callback on the frontend,
// with the three values Razorpay hands back after a successful payment.
// body: { orderId, razorpay_order_id, razorpay_payment_id, razorpay_signature }
router.post("/verify", async (req, res) => {
  try {
    const { orderId, razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    if (!orderId || !razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ message: "Missing verification fields" });
    }

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    // Razorpay's own recipe for proving the payment is genuine: HMAC the
    // "order_id|payment_id" string with your secret key and compare.
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      order.paymentStatus = "failed";
      await order.save();
      return res.status(400).json({ message: "Payment verification failed" });
    }

    order.paymentStatus = "paid";
    order.status = "confirmed";
    order.razorpayPaymentId = razorpay_payment_id;
    order.razorpaySignature = razorpay_signature;
    await order.save();

    res.json({ message: "Payment verified", order });
  } catch (err) {
    res.status(500).json({ message: "Verification failed", error: err.message });
  }
});

// POST /api/payments/webhook
// Optional but recommended: set this URL in Razorpay Dashboard > Settings >
// Webhooks, so payments still get marked "paid" even if the customer closes
// the tab right after paying, before the frontend can call /verify.
// Needs the raw request body for signature checking — server.js is set up
// to keep req.rawBody available for this route.
router.post("/webhook", async (req, res) => {
  try {
    const signature = req.headers["x-razorpay-signature"];
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

    if (secret) {
      const expected = crypto.createHmac("sha256", secret).update(req.rawBody).digest("hex");
      if (expected !== signature) {
        return res.status(400).json({ message: "Invalid webhook signature" });
      }
    }

    const event = req.body;
    if (event.event === "payment.captured") {
      const payment = event.payload.payment.entity;
      const order = await Order.findOne({ razorpayOrderId: payment.order_id });
      if (order && order.paymentStatus !== "paid") {
        order.paymentStatus = "paid";
        order.status = "confirmed";
        order.razorpayPaymentId = payment.id;
        await order.save();
      }
    }

    res.json({ received: true });
  } catch (err) {
    res.status(500).json({ message: "Webhook handling failed", error: err.message });
  }
});

module.exports = router;
