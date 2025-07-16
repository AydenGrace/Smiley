import express from "express";
import {
  getMyOrders,
  makeOrder,
  cancelOrder,
  validateOrder,
} from "../controllers/order.controller.js";
import {protectRoute} from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/currentUser", protectRoute, getMyOrders);
router.patch("/validate/:id", protectRoute, validateOrder);
router.patch("/cancel/:id", protectRoute, cancelOrder);
router.post("/", protectRoute, makeOrder);

export default router;
