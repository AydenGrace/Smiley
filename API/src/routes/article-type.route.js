import express from "express";
import {
  deleteOne,
  getAll,
  getById,
  patchOne,
  postOne,
} from "../controllers/article-type.controller.js";

const router = express.Router();

router.get("/", getAll);
router.post("/", postOne);
router.get("/:id", getById);
router.delete("/:id", deleteOne);
router.patch("/:id", patchOne);

export default router;
