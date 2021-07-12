/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Request, Response, NextFunction } from "express";
import helmet from "helmet";
import cors from "cors";
import httpStatus from "http-status";
import logger from "./services/logger";
import routes from "./routes";

const app = express();

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// enable cors
app.use(cors());

app.get("/ping", (req: Request, res: Response, next: NextFunction) => {
  res.send({ message: "pong" });
});

// Application routes
// app.use(`/users`, routes.users);
app.use(`/events`, routes.events);
app.use(`/workspaces`, routes.workspaces);

// // send back a 404 error for any unknown api request
app.use((req: Request, res: Response, next: NextFunction) => {
  logger.warn("Requested unknown route", { url: req.url });
  return res.status(httpStatus.NOT_FOUND).send("Not found");
});

export default app;
