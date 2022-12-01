import express from "express";

import { authRouter } from "api/routes/auth.routes";
import { memesRouter } from "api/routes/memes.routes";

export const router = express.Router();
router.use("/api/auth", authRouter);
router.use("/api/memes", memesRouter);