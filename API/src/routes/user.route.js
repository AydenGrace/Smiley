import express from "express";
import {
  deleteAccount,
  changeEmail,
  updateAccount,
  getInfos,
  confirmChangeEmail,
  changePwdAlreadyConnected,
} from "../controllers/user.controller.js";
import {protectRoute} from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/:id", protectRoute, getInfos);
router.delete("/:id", protectRoute, deleteAccount);
router.patch("/email/:id", protectRoute, changeEmail);
router.patch("/confirm-email/:token", protectRoute, confirmChangeEmail);
router.patch("/pwd/:id", protectRoute, changePwdAlreadyConnected);
router.patch("/:id", protectRoute, updateAccount);

export default router;
