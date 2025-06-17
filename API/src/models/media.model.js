import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },
    type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Media-Type",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Media", schema);
