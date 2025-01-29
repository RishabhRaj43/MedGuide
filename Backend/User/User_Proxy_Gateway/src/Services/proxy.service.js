import proxy from "express-http-proxy";
import env from "../config/Env/env.js";
import logger from "../config/logger.js";
import { authLimiter, universalLimiter } from "../config/limiter.js";

// Define proxy services
const proxyService = [
  {
    path: "/auth", // Path for authentication
    target: env.USER_AUTH_URL, // Target URL for authentication
  },
  {
    path: "/service", // Path for general services
    target: env.USER_URL, // Target URL for general services
  },
];

const middlewareMap = {
  "/auth": authLimiter,
};

// Create proxy middleware
const createProxy = (app) => {
  proxyService.forEach(({ path, target }) => {
    app.use(
      path,
      middlewareMap[path] || universalLimiter,
      proxy(target, {
        proxyReqPathResolver: (req) => {
          const newPath = req.originalUrl.replace(path, "") || "/";
          logger.info(
            `Proxying ${req.method} ${req.originalUrl} → ${target}${newPath}`
          );
          return newPath;
        },
        proxyErrorHandler: (err, res, next) => {
          // Handle proxy errors
          logger.error(`Proxy error: ${err.message}`, { stack: err.stack });
          res.status(503).json({ error: "Service unavailable" });
        },
        timeout: 5000, // 5-second timeout
      })
    );
  });
};

export default createProxy;
