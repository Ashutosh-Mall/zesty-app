import mongoose, { Schema } from "mongoose";

const customerSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    customerName: String,

    profileImage: String,
    address: String,
    city: String,
    state: String,
    pincode: String,

    defaultAddress: String,

    orderCount: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.model("Customer", customerSchema);
