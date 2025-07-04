import express from "express";
import {
  signUp,
  signUpConfirm,
  signIn,
  signOut,
  current,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/signup-confirmation/:token", signUpConfirm);
router.post("/signin", signIn);
router.post("/signout", signOut);
router.get("/current", current);

export default router;
