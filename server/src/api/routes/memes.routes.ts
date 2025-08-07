import { Router } from "express";

import { MemeController } from "@/controllers/meme.controller";
import { authorization } from "@/middleware/authorization";

const router = Router();

router.use(authorization);
router.get("", MemeController.getMemes);
router.post("", authorization, MemeController.uploadMeme);
router.get("/:id", MemeController.getMemeById);
router.delete("/:id", authorization, MemeController.deleteMemeById);

export default router;
