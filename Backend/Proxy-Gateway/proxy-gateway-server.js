import config from "./src/config/Env/env.js";  
import logger from "./src/config/logger.js";   
import app from "./src/App/app.js";   

const startServer = () => {
  const server = app.listen(config.PORT, () => {
    logger.info(
      `Server running in ${config.NODE_ENV} mode on port ${config.PORT}`
    );
  });

  process.on("unhandledRejection", (err) => {
    logger.error(`Unhandled Rejection: ${err.message}`);
    server.close(() => process.exit(1)); 
  });
};

startServer();  
