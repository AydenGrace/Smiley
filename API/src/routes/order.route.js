import express from "express";
import {getMyOrders, makeOrder} from "../controllers/order.controller.js";
import {protectRoute} from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/currentUser", protectRoute, getMyOrders);
router.post("/", protectRoute, makeOrder);

export default router;
