import { Router, Request, Response } from "express";
import { Types as mongooseTypes } from "mongoose";
import * as db from "../db";
const router = Router();

// Get all events (without workspaces)
router.get("/", async (req: Request, res: Response): Promise<void> => {
  const events = await db.getEvents();
  res.send({ events });
});

// Get a specific event
router.get("/:eventId", async (req: Request, res: Response): Promise<void> => {
  const { eventId } = req.params;
  const event = await db.getEvent(mongooseTypes.ObjectId(eventId));
  res.send({ event });
});

// Add new event
router.post("/", async (req: Request, res: Response): Promise<void> => {
  const { name } = req.body;
  const event = await db.addEvent({ name });
  res.send({ event });
});

export default router;
