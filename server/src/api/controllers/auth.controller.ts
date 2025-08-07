import asyncHandler from "express-async-handler";

import { ENV } from "@/config/constants";
import { AuthService } from "@/services/auth.service";

export const AuthController = {
  login: asyncHandler(async (req, res) => {
    const { username, password, userAgent, ip } = req.body;
    if (!username || !password || !userAgent || !ip) {
      throw { message: "Invalid credentials", status: 401 };
    }

    const { accessToken, refreshToken, sessionId } = await AuthService.login(
      username,
      password,
      userAgent,
      ip,
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      path: "/",
      sameSite: "strict",
      secure: ENV.NODE_ENV !== "development",
    });

    res.cookie("sessionId", sessionId, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      path: "/",
      sameSite: "strict",
      secure: ENV.NODE_ENV !== "development",
    });

    res.status(200).json({ message: "Logged in successfully", accessToken });
  }),

  register: asyncHandler(async (req, res) => {
    const { username, email, password, userAgent, ip } = req.body;
    if (!username || !email || !password || !userAgent || !ip) {
      throw { message: "Invalid credentials", status: 401 };
    }

    const { accessToken, refreshToken, sessionId } = await AuthService.register(
      username,
      email,
      password,
      userAgent,
      ip,
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      path: "/",
      sameSite: "strict",
      secure: ENV.NODE_ENV !== "development",
    });

    res.cookie("sessionId", sessionId, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      path: "/",
      sameSite: "strict",
      secure: ENV.NODE_ENV !== "development",
    });

    res.status(201).json({ message: "Registered successfully", accessToken });
  }),

  logout: asyncHandler(async (req, res) => {
    const { userId } = req.body;
    const { sessionId } = req.cookies;
    if (!userId || !sessionId) {
      throw { message: "You are not logged in", status: 400 };
    }

    await AuthService.logout(userId, sessionId);
    res.status(200).json({ message: "Logged out successfully" });
  }),

  refreshToken: asyncHandler(async (req, res) => {
    const { refreshToken, sessionId } = req.cookies;
    if (!refreshToken || !sessionId) {
      throw { message: "You are not logged in", status: 400 };
    }

    const accessToken = await AuthService.refreshToken(refreshToken, sessionId);
    res.status(200).json({ message: "Token refreshed successfully", accessToken });
  }),
};
