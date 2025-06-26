import express from "express";
import {post, get} from "../controllers/article.controller.js";
import {protectAdminRoute} from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", protectAdminRoute, post);
router.get("/", get);

export default router;
