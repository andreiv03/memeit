import mongoose from "mongoose";
import { constants } from "utils/constants";

export const connectToMongoDB = async () => {
  if (!constants.MONGODB_URI) throw new Error("Database URI not found!");

  await mongoose.connect(constants.MONGODB_URI).catch((error: mongoose.MongooseError) => {
    if (error) throw error;
  });

  mongoose.connection.on("connected", () => console.log("Mongoose connection established!"));
  mongoose.connection.on("disconnected", () => console.warn("Mongoose connection lost!"));
  mongoose.connection.on("error", (error: mongoose.MongooseError) => console.error(`Mongoose connection error:\n${error.stack}`));
};