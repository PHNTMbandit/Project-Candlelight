import { InferSchemaType, Schema, model } from "mongoose";

const TaskSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true },
    title: { type: String },
    check: { type: Boolean, default: false, required: true },
  },
  { timestamps: true }
);

type Task = InferSchemaType<typeof TaskSchema>;

export default model<Task>("Task", TaskSchema);
