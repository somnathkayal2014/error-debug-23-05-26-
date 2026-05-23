import mongoose from "mongoose";

const todoSchemaTwo = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "cls2",
      required: true,
    },
  },
  { timestamps: true },
);
export default mongoose.model("clsTwo", todoSchemaTwo);
