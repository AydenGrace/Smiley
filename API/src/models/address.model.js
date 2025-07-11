import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    // number: {
    //   type: Number,
    //   required: true,
    // },
    // further: {
    //   type: String,
    // },
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    zip_code: {
      type: Number,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Address", schema);
