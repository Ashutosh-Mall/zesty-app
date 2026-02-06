import mongoose, { Schema } from "mongoose";
import orderItemSchema from "./orderItem.model.js";

const cartSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
      unique: true
    },
    items: [orderItemSchema],
    totalAmount: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

export default mongoose.model("Cart", cartSchema);
