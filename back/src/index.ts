require("dotenv").config()
import * as mongooseService from "./services/mongoose";
import logger from "./services/logger";

import app from "./app";

let server: any;

async function init() {
  try {
    await mongooseService.init();
    logger.info("Connected to MongoDB");
    server = app.listen(process.env.SERVER_PORT, () => {
      logger.info(`Listening to port ${process.env.SERVER_PORT}`);
    });
  } catch (err: any) {
    logger.error("Cannot connect to MongoDB", err);
  }
}

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error: any) => {
  logger.error(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  logger.info("SIGTERM received");
  if (server) {
    server.close();
  }
});

init()
  .then(() => {
    logger.info("Server is running");
  })
  .catch((err) => {
    logger.error(err);
  });
