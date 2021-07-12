import mongoose, { Schema } from "mongoose";
import { WorkspaceStatus, IWorkspace, WorkspaceId } from "../types/Workspace";
import { updateRegisteredUsers } from "../wss";

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

// Stage 1: Broadcast to all of the connected users when saving
// WorkspaceSchema.post("save", async function (doc, next) {
//   let WorkspaceModel = mongoose.model<IWorkspace>("Workspace");
//   const workspaces = await WorkspaceModel.find();
//   await broadcast({ data: workspaces });
//   return next();
// });

// Stage 2: Only send update to registered users
WorkspaceSchema.post("save", async function (doc: IWorkspace, next) {
  let WorkspaceModel = mongoose.model<IWorkspace>("Workspace");

  // Get workspaces for the specific event
  const workspaces = await WorkspaceModel.find({
    eventId: doc.eventId,
  });

  // Update the registered users
  await updateRegisteredUsers({ data: workspaces }, doc.eventId.toString());
  return next();
});

export default mongoose.model<IWorkspace>("Workspace", WorkspaceSchema);
