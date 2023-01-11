import express from "express";

import { userController } from "api/controllers/users/user.controller";
import { authorization } from "api/middleware/authorization.middleware";

const router = express.Router();
router.get("/user", authorization, userController);

export { router as usersRouter };
