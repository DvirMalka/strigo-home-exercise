import { isEmpty } from "lodash";
import winston from "winston";

const enumerateErrorFormat = winston.format((info) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack });
  }
  return info;
});

const logger = winston.createLogger({
  // level: config.env === "development" ? "debug" : "info",
  level: "info",
  format: winston.format.combine(
    enumerateErrorFormat(),
    winston.format.colorize(),
    winston.format.splat(),
    winston.format.printf(
      ({ level, message, ...params }) =>
        `${level}: ${message}` + (isEmpty(params) ? "" : ` ${JSON.stringify(params, null, 2)}`)
    )
  ),
  transports: [
    new winston.transports.Console({
      stderrLevels: ["error"],
    }),
  ],
});

export default logger;
