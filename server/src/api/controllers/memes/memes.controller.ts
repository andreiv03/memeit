import type { Request, Response } from "express";

interface ExtendedPostRequest extends Request {
  body: {
    description: string;
    image: string;
  };
}

const GET = async (_req: Request, res: Response) => {
  try {
    const { MemesModel } = await import("api/models/memes.model");
    const memes = await MemesModel.find()
      .sort({ createdAt: -1 })
      .limit(9)
      .select("_id description image userId")
      .lean();

    return res.status(200).json(memes);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

const POST = async (req: ExtendedPostRequest, res: Response) => {
  try {
    const { description, image } = req.body;
    if (!description || !image)
      return res.status(400).json({ message: "All fields are required!" });

    const { handleCloudinaryUpload } = await import("utils/cloudinary");
    const cloudinaryImage = await handleCloudinaryUpload(image);

    const { MemesModel } = await import("api/models/memes.model");
    const meme = await MemesModel.create({
      description,
      image: {
        publicId: cloudinaryImage.public_id,
        url: cloudinaryImage.secure_url
      },
      userId: req.userId
    });

    return res.status(200).json({ _id: meme._id });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const memesController = (req: Request, res: Response) => {
  switch (req.method) {
    case "GET":
      return GET(req, res);
    case "POST":
      return POST(req, res);
    default:
      return res.status(404).json({ message: "API route not found!" });
  }
};
