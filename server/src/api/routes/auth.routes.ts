import express from "express";
import {
  loginController,
  logoutController,
  refreshTokenController,
  registerController
} from "api/controllers/auth";

const router = express.Router();
router.post("/login", loginController);
router.get("/logout", logoutController);
router.get("/refresh-token", refreshTokenController);
router.post("/register", registerController);

export { router as authRouter };
