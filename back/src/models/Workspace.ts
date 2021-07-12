import mongoose, { Schema } from "mongoose";

import { EventId } from "./Event";

export type WorkspaceId = mongoose.Types.ObjectId;

export enum WorkspaceStatus {
  OFFLINE = "offline",
  PREPARING = "preparing",
  READY = "ready",
  TERMINATED = "terminated",
  DELETED = "deleted",
}

export interface IWorkspace {
  eventId?: EventId;
  id?: WorkspaceId;
  owner: string;
  status: WorkspaceStatus;
  createdAt?: Date;
}

const WorkspaceSchema: Schema = new Schema(
  {
    eventId: {
      type: mongoose.Types.ObjectId,
      required: true,
      index: true,
      ref: "Event",
    },
    owner: { type: String, required: true, index: false },
    status: {
      type: String,
      enum: Object.values(WorkspaceStatus),
      required: true,
      index: false,
    },
  },
  { timestamps: true }
);

WorkspaceSchema.set("toJSON", {
  transform: function (doc: any, ret: any, options: any) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

export default mongoose.model<IWorkspace>("Workspace", WorkspaceSchema);
