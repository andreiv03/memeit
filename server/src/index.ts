import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";

import { router } from "api/routes";
import { establishMongoDBConnection } from "connections/mongoose";
import { constants } from "utils/constants";

const PORT = 5000;
const server = express();
server.use(cookieParser());
server.use(cors({ credentials: true, origin: constants.CLIENT_URL }));
server.use(express.json());
server.use(router);

if (process.env["NODE_ENV"] !== "production")
  server.get("*", (_req, res) => res.send(`Server is running on port ${PORT}`));

server
  .listen(PORT, async () => await establishMongoDBConnection())
  .on("error", () => process.exit(1));
