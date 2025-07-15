import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    code: {
      type: String,
      unique: true,
    },
    delivery_code: {
      type: String,
    },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    address_delivery: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
      required: true,
    },
    address_billing: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
      required: true,
    },
    status: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Status",
      required: true,
    },
    histories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "History",
        required: true,
      },
    ],
    articles: [
      {
        article: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Article",
          required: true,
        },
        amount: {
          type: Number,
          required: true,
          min: 1,
        },
        unit_price: {
          type: Number,
          required: true,
        },
      },
    ],
    discount: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Discount",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Order", schema);
