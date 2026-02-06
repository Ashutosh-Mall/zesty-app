import mongoose, { Schema } from "mongoose";

const orderItemSchema = new Schema(
  {
    food: {
      type: Schema.Types.ObjectId,
      ref: "FoodItem",
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    price: {
      type: Number,
      required: true
    }
  },
  { _id: false }
);

export default orderItemSchema;
