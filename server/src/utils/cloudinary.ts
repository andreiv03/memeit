import cloudinary from "cloudinary";
import { constants } from "utils/constants";

const cloudinary_v2 = cloudinary.v2;
cloudinary_v2.config({
  api_key: constants.CLOUDINARY.API_KEY,
  api_secret: constants.CLOUDINARY.API_SECRET,
  cloud_name: constants.CLOUDINARY.CLOUD_NAME
});

export const handleCloudinaryUpload = (imageDataUrl: string) => {
  return cloudinary_v2.uploader.upload(imageDataUrl, {
    crop: "scale",
    dpr: "auto",
    folder: "memeit",
    responsive: true,
    width: "auto"
  });
};
