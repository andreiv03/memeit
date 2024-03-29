import type { Request, Response } from "express";

const GET = async (req: Request, res: Response) => {
  try {
    const { UsersModel } = await import("api/models/users.model");
    const user = await UsersModel.findById(req.userId).select("_id email username").lean();
    if (!user) return res.status(404).json({ message: "User not found!" });
    return res.status(200).json(user);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const userController = (req: Request, res: Response) => {
  switch (req.method) {
    case "GET":
      return GET(req, res);
    default:
      return res.status(404).json({ message: "API route not found!" });
  }
};
