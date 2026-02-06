import mongoose, { Schema } from "mongoose";

const deliveryPartnerSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    vehicleType: String,
    vehicleNumber: String,
    licenseNumber: String,

    isVerified: { type: Boolean, default: true },

    status: {
      type: String,
      enum: ["available", "busy", "offline"],
      default: "offline",
    },

    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.model("DeliveryPartner", deliveryPartnerSchema);