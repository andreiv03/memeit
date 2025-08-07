import { User } from "@/models/user.model";

export const UserService = {
  async getUserById(userId: string) {
    const user = User.findById(userId, "_id email username").lean();
    if (!user) {
      throw { message: "User not found", status: 404 };
    }

    return user;
  },
};
