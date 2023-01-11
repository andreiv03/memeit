export const constants = {
  CLOUDINARY: {
    API_KEY: process.env["CLOUDINARY_API_KEY"] as string,
    API_SECRET: process.env["CLOUDINARY_API_SECRET"] as string,
    CLOUD_NAME: process.env["CLOUDINARY_CLOUD_NAME"] as string
  },
  JWT_SECRET: process.env["JWT_SECRET"] as string,
  MONGODB_URI: process.env["MONGODB_URI"] as string
};

Object.entries(constants).forEach(([key, value]) => {
  if (typeof value === "undefined") throw new Error(`${key} not found!`);
});
