import mongoose, {Schema} from "mongoose";

const vendorSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      unique: true,
      required: true,
    },

    profileImage:String,

    image1:String,
    image2:String,
    image3:String,
    image4:String,

    shopName: String,
    restaurantName: String,

    address: String,
    city: String,
    state: String,
    pincode: String,

    gstNumber: String,
    panNumber: String,

    isActive: {type: Boolean, default: true},

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  {timestamps: true}
);

export default mongoose.model("Vendor", vendorSchema);