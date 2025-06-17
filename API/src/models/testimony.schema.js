import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    content: {
      type: String,
    },
    value: {
      type: Number,
      required: true,
      min: 0,
    },
    article: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Article",
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Testimony", schema);
