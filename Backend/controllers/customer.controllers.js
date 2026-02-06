import Customer from "../models/customer.model.js";
import User from "../models/user.model.js";

export const customerProfile = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({message: "User ID missing"});
    }

    const customer = await Customer.findOne({userId}).populate("userId");


    if (!customer) {
      return res.status(404).json({message: "Customer not found"});
    }

    return res.status(200).json(customer);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({message: "Server error while fetching customer profile"});
  }
};

export const customerProfileUpdate = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({message: "User ID missing"});
    }

    const {address, city, state, pincode, defaultAddress, profileImage} =
      req.body;

    const customer = await Customer.findOne({userId});

    if (!customer) {
      return res.status(404).json({message: "Customer not found"});
    }
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({message: "User not found"});
    }
    customer.customerName = user.fullName;

    if (profileImage != undefined) customer.profileImage = profileImage;
    if (address !== undefined) customer.address = address;
    if (city !== undefined) customer.city = city;
    if (state !== undefined) customer.state = state;
    if (pincode !== undefined) customer.pincode = pincode;
    if (defaultAddress !== undefined) customer.defaultAddress = defaultAddress;

    await customer.save();

    return res.status(200).json({
      message: "Customer profile updated successfully",
      customer,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error while updating customer profile",
    });
  }
};
