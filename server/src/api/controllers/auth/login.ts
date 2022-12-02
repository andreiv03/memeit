import bcrypt from "bcrypt";
import type { Request, Response } from "express";

interface ExtendedPostRequest extends Request {
  body: {
    email: string;
    password: string;
  };
}

const POST = async (req: ExtendedPostRequest, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "All fields are required!" });

    const { UsersModel } = await import("api/models");
    const user = await UsersModel.findOne({ email }).select("password").lean();
    if (!user) return res.status(404).json({ message: "User not found!" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Incorrect password!" });

    const { signToken } = await import("utils/token");
    const accessToken = await signToken(user._id, "10m");
    const refreshToken = await signToken(user._id, "7d");

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      path: "/",
      sameSite: "strict",
      secure: process.env["NODE_ENV"] !== "development"
    });

    return res.status(200).json({ accessToken });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const loginController = (req: Request, res: Response) => {
  switch (req.method) {
    case "POST":
      return POST(req, res);
    default:
      return res.status(404).json({ message: "API route not found!" });
  }
};
