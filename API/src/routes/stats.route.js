import express from "express";
import {getAll} from "../controllers/stats.controller.js";
import {protectAdminRoute} from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", protectAdminRoute, getAll);

export default router;
