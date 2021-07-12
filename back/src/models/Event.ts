import mongoose, { Schema } from "mongoose";
import { IEvent } from "../types/Event";

const EventSchema: Schema = new Schema({
  name: { type: String, required: true, index: false },
});

EventSchema.set("toJSON", {
  transform: (doc: any, ret: any, options: any) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

export default mongoose.model<IEvent>("Event", EventSchema);
