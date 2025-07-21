import express from "express";
import {post, get, getById, update} from "../controllers/article.controller.js";
import {protectAdminRoute} from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", protectAdminRoute, post);
router.patch("/", protectAdminRoute, update);
router.get("/", get);
router.get("/:id", getById);

export default router;
