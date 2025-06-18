import express from "express";
import { deleteAccount } from "../controllers/user.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.delete("/:id", protectRoute, deleteAccount);

export default router;
