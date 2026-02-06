import mongoose from "mongoose";
import {Schema} from "mongoose";

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["customer", "vendor", "delivery", "admin"],
      required: true,
    },
    otp: String,
    otpExpiry: Date,
    isOtpVerified: Boolean,
  },
  {timestamps: true}
);

const User = mongoose.model("User", userSchema);
export default User;
