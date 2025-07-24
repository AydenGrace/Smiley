import express from "express";
import {
  getMyOrders,
  makeOrder,
  cancelOrder,
  validateOrder,
  getMyOrderDetails,
  getAllOrders,
  getOrderDetails,
  patchDeliveryCode,
} from "../controllers/order.controller.js";
import {
  protectRoute,
  protectAdminRoute,
} from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/currentUser", protectRoute, getMyOrders);
router.get("/my-details/:id", protectRoute, getMyOrderDetails);
router.get("/:id", protectAdminRoute, getOrderDetails);
router.get("/", protectAdminRoute, getAllOrders);
router.patch("/set-code/:id", protectAdminRoute, patchDeliveryCode);
router.patch("/validate/:id", protectRoute, validateOrder);
router.patch("/cancel/:id", protectRoute, cancelOrder);
router.post("/", protectRoute, makeOrder);

export default router;
