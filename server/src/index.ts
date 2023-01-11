import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";

import { router } from "api/routes";
import { establishMongoDBConnection } from "utils/mongodb";

const URLS = {
  DEVELOPMENT: "http://localhost:3000",
  PRODUCTION: ""
};

const CLIENT_URL = process.env["NODE_ENV"] === "production" ? URLS.PRODUCTION : URLS.DEVELOPMENT;
const PORT = process.env["NODE_ENV"] === "production" ? process.env["PORT"] : "5000";

const server = express();
server.use(cookieParser());
server.use(cors({ credentials: true, origin: CLIENT_URL }));
server.use(express.json({ limit: "10mb" }));
server.use(express.urlencoded({ extended: true, limit: "10mb" }));
server.use(router);

if (process.env["NODE_ENV"] !== "production")
  server.get("*", (_req, res) => res.send(`Server is running on port ${PORT}`));

establishMongoDBConnection();
server.listen(PORT).on("error", () => process.exit(1));
