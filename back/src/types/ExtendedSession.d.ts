import { Express } from "express";
import "express-session";
import { UserId } from "./User";

declare module "express" {
  export interface Request {
    session: Express.Session & {
      userId: UserId;
    };
  }
}
