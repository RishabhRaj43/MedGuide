import rateLimit from "express-rate-limit";
import env from "./Env/env.js";

export const universalLimiter = rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW,
  max: env.RATE_LIMIT_MAX,
  handler: (req, res, next) => {
    res.status(429).json({
      error: "Too many requests",
      message: "Whoa there, slow down, bro 🐢. The server needs a break 🛋️💆‍♂️.",
    });
  },
});

export const authLimiter = rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW,
  max: env.AUTH_RATE_LIMIT_MAX,
  handler: (req, res, next) => {
    res.status(429).json({
      error: "Too many requests",
      message: "Whoa there, slow down, bro 🐢. The server needs a break 🛋️💆‍♂️.",
    });
  },
});
