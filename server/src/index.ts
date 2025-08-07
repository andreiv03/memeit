import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import http from "http";

import { CORS_OPTIONS, ENV, HELMET_OPTIONS } from "@/config/constants";
import { establishMongoDBConnection } from "@/config/db";
import { errorHandler } from "@/middleware/error-handler";

import authRouter from "@/routes/auth.routes";
import memesRouter from "@/routes/memes.routes";
import usersRouter from "@/api/routes/users.routes";

const app = express();

// Middleware
app.use(compression());
app.use(cookieParser());
app.use(cors(CORS_OPTIONS));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));
app.use(helmet(HELMET_OPTIONS));

// API Routes
app.use("/api/auth", authRouter);
app.use("/api/memes", memesRouter);
app.use("/api/users", usersRouter);

app.use((_req, res) => {
  res.status(404).json({ error: "API Route Not Found" });
});

app.use(errorHandler);

const httpServer = http.createServer(app);
establishMongoDBConnection();

httpServer.listen(ENV.PORT, () => {
  console.log(`Server is running on port ${ENV.PORT}`);
});

const shutdown = () => {
  console.log("Shutting down server...");
  httpServer.close(() => {
    console.log("Server is offline");
    process.exit(0);
  });
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
