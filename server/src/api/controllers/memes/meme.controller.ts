import type { Request, Response } from "express";

interface ExtendedPatchRequest extends Request {
  body: {
    description: string;
    image: string;
  };
}

const GET = async (req: Request, res: Response) => {
  try {
    const { _id } = req.params;
    if (!_id) return res.status(400).json({ message: "Something went wrong!" });

    const { MemesModel } = await import("api/models/memes.model");
    const meme = await MemesModel.findById(_id).select("_id description image userId").lean();
    if (!meme) return res.status(404).json({ message: "Meme not found!" });

    return res.status(200).json(meme);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

const PATCH = async (req: ExtendedPatchRequest, res: Response) => {
  try {
    const { _id } = req.params;
    if (!_id) return res.status(400).json({ message: "Something went wrong!" });

    const { description, image } = req.body;
    if (!description && !image)
      return res.status(400).json({ message: "At least one field is required!" });

    const { MemesModel } = await import("api/models/memes.model");
    const { handleCloudinaryUpload } = await import("utils/cloudinary");
    const cloudinaryImage = image ? await handleCloudinaryUpload(image) : undefined;

    const query: {
      description?: string | undefined;
      image?: {
        publicId?: string | undefined;
        url?: string | undefined;
      };
    } = {};

    if (description) query.description = description;
    if (cloudinaryImage)
      query.image = {
        publicId: cloudinaryImage.public_id,
        url: cloudinaryImage.secure_url
      };

    await MemesModel.findByIdAndUpdate(query);
    return res.status(200).json({ _id });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

const DELETE = async (req: Request, res: Response) => {
  try {
    const { _id } = req.params;
    if (!_id) return res.status(400).json({ message: "Something went wrong!" });

    const { MemesModel } = await import("api/models/memes.model");
    await MemesModel.findByIdAndDelete(_id);

    return res.status(200).json({ _id });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const memeController = (req: Request, res: Response) => {
  switch (req.method) {
    case "GET":
      return GET(req, res);
    case "PATCH":
      return PATCH(req, res);
    case "DELETE":
      return DELETE(req, res);
    default:
      return res.status(404).json({ message: "API route not found!" });
  }
};
