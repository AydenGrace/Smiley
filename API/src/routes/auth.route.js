import express from "express";
import {signUp, signUpConfirm} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/signup-confirmation/:token", signUpConfirm);

export default router;
