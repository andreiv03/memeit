import asyncHandler from "express-async-handler";
import { UserService } from "@/services/user.service";

export const UserController = {
  getUserById: asyncHandler(async (req, res) => {
    const userId = req.userId;
    if (!userId) {
      throw { message: "Unauthorized", status: 401 };
    }

    const user = await UserService.getUserById(userId);
    res.status(200).json({ message: "User profile fetched successfully", user });
  }),
};
