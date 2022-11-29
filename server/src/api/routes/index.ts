import express from "express";

import { authRouter } from "./auth.routes";
import { memesRouter } from "./memes.routes";

export const router = express.Router();
router.use("/api/auth", authRouter);
router.use("/api/memes", memesRouter);