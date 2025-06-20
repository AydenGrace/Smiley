import express from "express";
import {post} from "../controllers/article.controller.js";
import {protectAdminRoute} from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", protectAdminRoute, post);

export default router;
