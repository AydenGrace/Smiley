import {getAll} from "../controllers/status.controller.js";
import {protectAdminRoute} from "../middlewares/auth.middleware.js";
import express from "express";

const router = express.Router();

router.get("/", protectAdminRoute, getAll);

export default router;
