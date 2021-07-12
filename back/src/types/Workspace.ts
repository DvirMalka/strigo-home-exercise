import mongoose, { Schema } from "mongoose";

export type WorkspaceId = mongoose.Types.ObjectId;
import { EventId } from "./Event";

export enum WorkspaceStatus {
  OFFLINE = "offline",
  PREPARING = "preparing",
  READY = "ready",
  TERMINATED = "terminated",
  DELETED = "deleted",
}

export interface IWorkspace {
  id?: WorkspaceId;
  eventId: EventId;
  owner: string;
  status: WorkspaceStatus;
  createdAt?: Date;
}
