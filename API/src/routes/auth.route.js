import express from "express";
import {
  signUp,
  signUpConfirm,
  deleteAccount,
  signIn,
  signOut,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/signup-confirmation/:token", signUpConfirm);
router.post("/signin", signIn);
router.post("/signout", signOut);
router.delete("/:id", protectRoute, deleteAccount);

export default router;
