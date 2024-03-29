import bcrypt from "bcrypt";
import type { Request, Response } from "express";

interface ExtendedPostRequest extends Request {
  body: {
    email: string;
    password: string;
    username: string;
  };
}

const POST = async (req: ExtendedPostRequest, res: Response) => {
  try {
    const { email, password, username } = req.body;
    if (!email || !password || !username)
      return res.status(400).json({ message: "All fields are required!" });

    const { UsersModel } = await import("api/models/users.model");
    const isEmailRegistered = await UsersModel.exists({ email });
    if (isEmailRegistered)
      return res.status(400).json({ message: "Email address already registered!" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await UsersModel.create({
      email,
      password: hashedPassword,
      username
    });

    const { signToken } = await import("utils/token");
    const accessToken = await signToken(user._id, "10m");
    const refreshToken = await signToken(user._id, "7d");

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      path: "/",
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      sameSite: "strict",
      secure: process.env["NODE_ENV"] !== "development"
    });

    return res.status(200).json({ accessToken });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const registerController = (req: Request, res: Response) => {
  switch (req.method) {
    case "POST":
      return POST(req, res);
    default:
      return res.status(404).json({ message: "API route not found!" });
  }
};
