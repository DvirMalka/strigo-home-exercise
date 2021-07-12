import mongoose, { Schema } from "mongoose";
export type EventId = mongoose.Types.ObjectId;

export interface IEvent {
  id?: EventId;
  name: string;
}

const EventSchema: Schema = new Schema({
  name: { type: String, required: true, index: false },
});

EventSchema.set("toJSON", {
  transform: function (doc: any, ret: any, options: any) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

export default mongoose.model<IEvent>("Event", EventSchema);
