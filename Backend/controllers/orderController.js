const express = require("express");
const router = express.Router();
const { getProducts, createProduct } = require("../controllers/productController");

router.get("/", getProducts);     // GET  /api/products
router.post("/", createProduct);  // POST /api/products

module.exports = router;