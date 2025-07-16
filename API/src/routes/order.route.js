import express from "express";
import {
  getMyOrders,
  makeOrder,
  cancelOrder,
  validateOrder,
  getMyOrderDetails,
} from "../controllers/order.controller.js";
import {protectRoute} from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/currentUser", protectRoute, getMyOrders);
router.get("/my-details/:id", protectRoute, getMyOrderDetails);
router.patch("/validate/:id", protectRoute, validateOrder);
router.patch("/cancel/:id", protectRoute, cancelOrder);
router.post("/", protectRoute, makeOrder);

export default router;
