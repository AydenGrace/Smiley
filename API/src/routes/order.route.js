import express from "express";
import {getMyOrders} from "../controllers/order.controller.js";
import {protectRoute} from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/currentUser", protectRoute, getMyOrders);

export default router;
