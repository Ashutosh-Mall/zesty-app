import DeliveryPatner from "../models/deliveryPatner.model.js";
export const profile = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      res.satus(400).json({Message: "User ID missing"});
    }

    const deliveryBoy = await DeliveryPatner.findOne({userId: userId}).populate(
      "userId",
    );

    if (!deliveryBoy) {
      return res.status(404).json({message: "DeliveryBoy not found"});
    }

    return res.status(200).json(deliveryBoy);
  } catch (err) {
    console.error(error);
    return res
      .status(500)
      .json({message: "Server error while fetching delivery profile"});
  }
};

export const deliveryBoyProfileUpdate = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const {
      vehicleType,
      vehicleNumber,
      licenseNumber,
      isVerified,
      status,
      isActive,
    } = req.body;

    const deliveryBoy = await DeliveryPatner.findOne({ userId });

    if (!deliveryBoy) {
      return res.status(404).json({ message: "Delivery partner not found" });
    }

    if (vehicleType !== undefined) deliveryBoy.vehicleType = vehicleType;
    if (vehicleNumber !== undefined) deliveryBoy.vehicleNumber = vehicleNumber;
    if (licenseNumber !== undefined) deliveryBoy.licenseNumber = licenseNumber;
    if (isVerified !== undefined) deliveryBoy.isVerified = isVerified;
    if (status !== undefined) deliveryBoy.status = status;
    if (isActive !== undefined) deliveryBoy.isActive = isActive;

    await deliveryBoy.save();


    return res.status(200).json({
      success: true,
      message: "Delivery partner profile updated successfully",
      deliveryBoy,
    });
  } catch (err) {
    console.error("Delivery boy profile update error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error while updating delivery partner profile",
    });
  }
};
