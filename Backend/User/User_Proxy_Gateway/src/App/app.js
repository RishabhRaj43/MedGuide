import express from "express";
import cors from "cors";
import "express-async-errors";

import env from "../config/Env/env.js";
import logger from "../config/logger.js";
import createProxy from "../Services/proxy.service.js";

const app = express();

app.use(cors({ origin: env.CORS_ORIGIN }));

app.use(express.json());

app.use((req, res, next) => {
  logger.info(`Request received: ${req.method} ${req.originalUrl}`);
  next();
});

createProxy(app);

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
