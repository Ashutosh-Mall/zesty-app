import mongoose, { Schema } from "mongoose";

const foodItemSchema = new Schema(
  {
    vendor: { type: Schema.Types.ObjectId, ref: "Vendor", required: true },
    image:{type:String, required:true},
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: String,
    description: String,
    isAvailable: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.model("FoodItem", foodItemSchema);
