import { handleCloudinaryUpload } from "@/config/cloudinary";
import { Meme } from "@/models/meme.model";

export const MemeService = {
  async getMemeById(id: string) {
    const meme = Meme.findById(id, "_id description image userId").lean();
    if (!meme) {
      throw { message: "Meme not found", status: 404 };
    }

    return meme;
  },

  async getMemes() {
    const memes = await Meme.find()
      .sort({ createdAt: -1 })
      .limit(9)
      .select("_id description image userId")
      .lean();

    return memes;
  },

  async deleteMemeById(id: string) {
    await Meme.findByIdAndDelete(id);
  },

  async uploadMeme(userId: string, data: { description: string; image: string }) {
    const cloudinaryImage = await handleCloudinaryUpload(data.image);
    const meme = await Meme.create({
      description: data.description,
      image: {
        publicId: cloudinaryImage.public_id,
        url: cloudinaryImage.secure_url,
      },
      userId: userId,
    });

    return meme;
  },
};
