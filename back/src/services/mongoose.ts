import mongoose, { Mongoose } from "mongoose";
import logger from "./logger";
let mongooseClient: Mongoose;

const init = async (): Promise<Mongoose> => {
  logger.info(`Connecting to mongoDB in ${process.env.MONGODB_URI}`);
  mongooseClient = await mongoose.connect(<string>process.env.MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
  return mongooseClient;
};

const getClient = async (): Promise<Mongoose> => {
  if (!mongooseClient) {
    await init();
  }
  return mongooseClient;
};

export { init, getClient };
