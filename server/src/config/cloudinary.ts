import cloudinary, { type UploadApiResponse } from "cloudinary";

import { ENV } from "@/config/constants";

const cloudinaryV2 = cloudinary.v2;

cloudinaryV2.config({
  api_key: ENV.CLOUDINARY.API_KEY,
  api_secret: ENV.CLOUDINARY.API_SECRET,
  cloud_name: ENV.CLOUDINARY.CLOUD_NAME,
});

export const handleCloudinaryUpload = async (imageDataUrl: string): Promise<UploadApiResponse> => {
  try {
    return await cloudinaryV2.uploader.upload(imageDataUrl, {
      folder: "memeit",
      crop: "scale",
    });
  } catch (error) {
    console.error("Cloudinary upload failed:", error);
    throw new Error("Failed to upload image to Cloudinary");
  }
};
