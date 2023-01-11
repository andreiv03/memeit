import express from "express";

import { memeController } from "api/controllers/memes/meme.controller";
import { memesController } from "api/controllers/memes/memes.controller";
import { authorization } from "api/middleware/authorization.middleware";

const router = express.Router();
router.get("", memesController);
router.post("", authorization, memesController);
router.get("/:id", memeController);
router.patch("/:id", authorization, memeController);
router.delete("/:id", authorization, memeController);

export { router as memesRouter };
