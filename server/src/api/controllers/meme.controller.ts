import asyncHandler from "express-async-handler";
import { MemeService } from "@/services/meme.service";

export const MemeController = {
  getMemeById: asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!id) {
      throw { message: "Meme ID is missing", status: 400 };
    }

    const meme = await MemeService.getMemeById(id);
    res.status(200).json({ message: "Meme fetched successfully", meme });
  }),

  getMemes: asyncHandler(async (_req, res) => {
    const memes = await MemeService.getMemes();
    res.status(200).json({ message: "Memes fetched successfully", memes });
  }),

  deleteMemeById: asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!id) {
      throw { message: "Meme ID is missing", status: 400 };
    }

    await MemeService.deleteMemeById(id);
    res.status(200).json({ message: "Meme deleted successfully", _id: id });
  }),

  uploadMeme: asyncHandler(async (req, res) => {
    const { userId, description, image } = req.body;
    if (!userId) {
      throw { message: "User ID is required", status: 400 };
    }

    if (!description || !image) {
      throw { message: "All fields are required", status: 400 };
    }

    const meme = await MemeService.uploadMeme(userId, { description, image });
    res.status(201).json({ message: "Meme uploaded successfully", meme });
  }),
};
