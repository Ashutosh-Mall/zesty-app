import Vendor from "../models/vendor.model.js";

export const vendorProfile = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(404).json({message: "userId missing"});
    }

    const vendor = await Vendor.findOne({userId}).populate("userId");

    if (!vendor) {
      return res.status(404).json({message: "Vendor not found"});
    }

    return res.status(200).json(vendor);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({message: "Server error while fetching vendor profile"});
  }
};

export const vendorProfileUpdate = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({message: "userId missing"});
    }

    const {
      profileImage,
      image1,
      image2,
      image3,
      image4,
      shopName,
      restaurantName,
      address,
      city,
      state,
      pincode,
      gstNumber,
      panNumber,
    } = req.body;

    const vendor = await Vendor.findOne({userId});

    if (!vendor) {
      return res.status(404).json({message: "Vendor not found"});
    }


    if (profileImage !== undefined) vendor.profileImage = profileImage;
    if (image1 !== undefined) vendor.image1 = image1;
    if (image2 !== undefined) vendor.image2 = image2;
    if (image3 !== undefined) vendor.image3 = image3;
    if (image4 !== undefined) vendor.image4 = image4;

    if (shopName !== undefined) vendor.shopName = shopName;
    if (restaurantName !== undefined) vendor.restaurantName = restaurantName;
    if (address !== undefined) vendor.address = address;
    if (city !== undefined) vendor.city = city;
    if (state !== undefined) vendor.state = state;
    if (pincode !== undefined) vendor.pincode = pincode;
    if (gstNumber !== undefined) vendor.gstNumber = gstNumber;
    if (panNumber !== undefined) vendor.panNumber = panNumber;

    await vendor.save();

    return res.status(200).json({
      message: "Vendor profile updated successfully",
      vendor,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error while updating vendor profile",
    });
  }
};
