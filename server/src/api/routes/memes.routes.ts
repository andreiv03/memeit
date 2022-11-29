import express from "express";

import { memeController, memesController } from "../controllers/memes";
import { authorization } from "../middleware";

const router = express.Router();
router.get("", memesController);
router.post("", authorization, memesController);
router.get("/:id", memeController);
router.patch("/:id", authorization, memeController);
router.delete("/:id", authorization, memeController);

export { router as memesRouter };