
import { Schema, model } from "mongoose";

const ListSchema = new Schema({
  task: {
    type: String,
    required: true,
    trim: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
    user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const list = model("List", ListSchema);
export default list;
