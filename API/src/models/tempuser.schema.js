import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    email: {type: String, required: true, unique: true},
    token: String,
  },
  {
    timestamps: true,
  }
);

schema.index({createdAt: 1}, {expireAfterSeconds: 60 * 60 * 24});

export default mongoose.model("User-Temp", schema);
