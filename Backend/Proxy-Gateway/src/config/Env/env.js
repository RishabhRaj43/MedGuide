import dotenv from "dotenv";
dotenv.config();

export default {
  PORT: process.env.PORT, // Server port (environment variable fallback)
  NODE_ENV: process.env.NODE_ENV, // Runtime environment
  USER_SERVICE_URL: process.env.USER_SERVICE_URL,
  DOCTOR_SERVICE_URL: process.env.DOCTOR_SERVICE_URL,
  CORS_ORIGIN:
    process.env.CORS_ORIGIN.split(",").forEach((item) => item.trim()) || "", // Allowed CORS origins
  RATE_LIMIT_WINDOW: process.env.RATE_LIMIT_WINDOW, // 15 minutes in milliseconds
  RATE_LIMIT_MAX: process.env.RATE_LIMIT_MAX, // Max requests per window
};
