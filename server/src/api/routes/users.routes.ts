import { Router } from "express";

import { UserController } from "@/controllers/user.controller";
import { authorization } from "@/middleware/authorization";

const router = Router();

router.use(authorization);
router.get("/user", UserController.getUserById);

export default router;
