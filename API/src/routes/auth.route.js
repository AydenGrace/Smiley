import express from "express";
import {
  signUp,
  signUpConfirm,
  signIn,
  signOut,
  current,
  forgotPwd,
  changeForgotPwd,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/signup-confirmation/:token", signUpConfirm);
router.post("/signin", signIn);
router.post("/signout", signOut);
router.get("/current", current);
router.post("/forgot-pwd", forgotPwd);
router.patch("/change-pwd/:token", changeForgotPwd);

export default router;
