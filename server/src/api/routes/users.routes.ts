import express from "express";

import { userController } from "api/controllers/users";
import { authorization } from "api/middleware";

const router = express.Router();
router.get("/user", authorization, userController);

export { router as usersRouter };
