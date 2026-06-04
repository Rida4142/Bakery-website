const express = require("express");
const router = express.Router();
const { getOrders, createOrder, updateOrderStatus } = require("../controllers/orderController");

router.get("/", getOrders);                      // GET  /api/orders
router.post("/", createOrder);                   // POST /api/orders
router.patch("/:id/status", updateOrderStatus);  // PATCH /api/orders/:id/status

module.exports = router;