import express from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import rateLimit from "express-rate-limit";
import config from "../config/Env/env.js";
import logger from "../config/logger.js";
import { userProxy } from "../services/proxy.service.js";
import "express-async-errors";

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: config.CORS_ORIGIN,
  })
);
app.use(compression());
app.use(express.json());
app.use(
  rateLimit({
    windowMs: config.RATE_LIMIT_WINDOW,
    max: config.RATE_LIMIT_MAX,
    handler: (req, res, next) => {
      res.status(429).json({
        error: "Too many requests",
        message:
          "Whoa there, slow down, bro 🐢. The server needs a break 🛋️💆‍♂️.",
      });
    },
  })
);

app.use((req, res, next) => {
  logger.info(`${req.method} ${req.originalUrl}`);
  next();
});

app.use("/api/user", userProxy);

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  const statusCode = error.status || 500;
  res.status(statusCode).json({
    message: error.message || "Internal Server Error",
  });
});

export default app;
