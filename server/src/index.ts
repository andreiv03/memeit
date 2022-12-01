import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";

import { router } from "api/routes";
import { connectToMongoDB } from "connections/mongoose";
import { constants } from "utils/constants";

const server = express();
server.use(cookieParser());
server.use(cors({ credentials: true, origin: constants.CLIENT_URL }));
server.use(express.json());
server.use(router);

if (process.env.NODE_ENV !== "production")
  server.get("*", (req, res) => res.send("Server is running!"));

const PORT = 5000;
server.listen(PORT, async () => {
  await connectToMongoDB();
  console.log(`Server is running on port ${PORT}`);
}).on("error", () => process.exit(1));