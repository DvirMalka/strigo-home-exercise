import { Router, Request, Response } from "express";
import { Types as mongooseTypes } from "mongoose";
import * as db from "../db";
const router = Router();

// Get all workspaces
router.get("/", async function (req: Request, res: Response): Promise<void> {
  const workspaces = await db.getWorkspaces();
  res.send({ workspaces });
});

// Get workspaces of a specific event
router.get("/:eventId", async (req: Request, res: Response): Promise<void> => {
  const { eventId } = req.params;
  const workspaces = await db.getEventWorkspaces(
    mongooseTypes.ObjectId(eventId)
  );
  res.send({ workspaces });
});

// Add workspace to event
router.post("/:eventId", async (req: Request, res: Response): Promise<void> => {
  const { eventId } = req.params;
  const { owner, status } = req.body;
  const workspace = await db.addWorkspace({
    eventId: mongooseTypes.ObjectId(eventId),
    owner,
    status,
  });
  res.send({ workspace });
});

export default router;
