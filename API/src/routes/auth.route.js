import express from "express";
import {
  signUp,
  signUpConfirm,
  signIn,
  signOut,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/signup-confirmation/:token", signUpConfirm);
router.post("/signin", signIn);
router.post("/signout", signOut);

export default router;
