import mongoose from "mongoose";
import { logger, level } from "./logger.js";
import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve("./.env"),
});

const URL = process.env.MONGO_URL;
const OPEN_EVENT = "open";
const ERROR_EVENT = "error";

(async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (e) {
    logger.log(level.error, `connection error ${e}`);
  }
})();

const db = mongoose.connection;
db.once(OPEN_EVENT, () => {
  logger.log(level.info, `Successfully connected to db at ${URL}`);
});
db.on(ERROR_EVENT, () => {
  logger.log(level.error, `connection error while connection at ${URL}`);
});
