require("dotenv").config();
const connectDB = require("../config/db");
const Product = require("../models/Product");
const products = require("./products.json");

async function run() {
  await connectDB();

  await Product.deleteMany({});
  await Product.insertMany(products);

  console.log(`Seeded ${products.length} products.`);
  process.exit(0);
}

run().catch(err => {
  console.error("Seed failed:", err);
  process.exit(1);
});
