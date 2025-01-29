import app from "./src/App/app.js";
import env from "./src/config/Env/env.js";
import logger from "./src/config/logger.js";

const startServer = () => {
  app.listen(env.PORT, () => {
    logger.info(`Server running in ${env.NODE_ENV} mode on port ${env.PORT}`);
  });
};

startServer();
