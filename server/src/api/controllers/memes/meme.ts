import type { Request, Response } from "express";

interface ExtendedPatchRequest extends Request {
  body: {
    description: string;
  };
}

const GET = async (req: Request, res: Response) => {
  try {
    const { _id } = req.params;
    if (!_id) return res.status(400).json({ message: "Something went wrong!" });

    const { MemesModel } = await import("api/models");
    const meme = await MemesModel.findById(_id).select("_id description userId").lean();
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

    const { description } = req.body;
    if (!description) return res.status(400).json({ message: "All fields are required!" });

    const { MemesModel } = await import("api/models");
    await MemesModel.findByIdAndUpdate(_id, { description });

    return res.status(200).json({ _id });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

const DELETE = async (req: Request, res: Response) => {
  try {
    const { _id } = req.params;
    if (!_id) return res.status(400).json({ message: "Something went wrong!" });

    const { MemesModel } = await import("api/models");
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
