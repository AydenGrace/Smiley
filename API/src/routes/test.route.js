import express from "express";
import {sendEmail} from "../controllers/test.controller.js";

const router = express.Router();

router.post("/email", sendEmail);
export default router;
