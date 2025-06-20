import express from "express";
import {deleteSafe, get, patch, post} from "../controllers/media.controller.js";
import {protectAdminRoute} from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", protectAdminRoute, post);
router.get("/:id", get);
router.patch("/:id", protectAdminRoute, patch);
router.delete("/:id", protectAdminRoute, deleteSafe);

export default router;
