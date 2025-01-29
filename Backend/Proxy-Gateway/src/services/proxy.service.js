import proxy from "express-http-proxy";
import config from "../config/Env/env.js";
import logger from "../config/logger.js";

const createProxy = (serviceUrl, serviceName) =>
  proxy(serviceUrl, {
    proxyReqPathResolver: (req) => {
      // Remove service prefix from URL
      const newPath = req.originalUrl.replace(`/${serviceName}`, "");
      // Log proxy request
      logger.info(
        `Proxying ${req.method} ${req.originalUrl} → ${serviceUrl} ${newPath}`
      );

      return newPath;
    },
    proxyErrorHandler: (err, res, next) => {
      // Handle proxy errors
      logger.error(`Proxy error: ${err.message}`);
      res.status(503).json({ error: "Service unavailable" });
    },
    timeout: 5000, // 5-second timeout
    limit: "10mb", // Request size limit
  });

// For creating specific proxies
export const userProxy = createProxy(config.USER_SERVICE_URL, "api/user");
export const doctorProxy = createProxy(config.DOCTOR_SERVICE_URL, "api/doctor");
