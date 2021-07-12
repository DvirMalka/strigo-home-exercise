import mongoose, { Schema } from "mongoose";
export type EventId = mongoose.Types.ObjectId;

export interface IEvent {
  id?: EventId;
  name: string;
}