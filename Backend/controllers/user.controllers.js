import User from "../models/user.model.js";
import Customer from "../models/customer.model.js";
import DeliveryPartner from "../models/deliveryPatner.model.js";
import Vendor from "../models/vendor.model.js";
import bcrypt from "bcrypt";
import tokenId from "../utils/token.js";
import "dotenv/config";
import {sendOtpMail} from "../config/otp.js";

export const signUp = async (req, res) => {
  try {
    const {fullName, email, password, mobile, role} = req.body;
    const user = await User.findOne({email});
    if (user) return res.status(400).json({message: "User already Exist"});
    if (password.length < 6) {
      return res
        .status(400)
        .json({message: "Password must be at least 6 character"});
    }
    if (!mobile || mobile.length !== 10) {
      return res
        .status(400)
        .json({message: "Moblie number must be of ten digits"});
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      mobile,
      role,
    });

    await newUser.save();

    let roleId = "";

    if (role === "vendor") {
      const newVendor = await Vendor.create({
        userId: newUser._id,
        shopName: "",
        restaurantName: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        gstNumber: "",
        panNumber: "",
      });
      roleId = newVendor._id;
    }

    if (role === "customer") {
      const newCustomer = await Customer.create({
        userId: newUser._id,
        address: "",
        city: "",
        state: "",
        pincode: "",
      });
      roleId = newCustomer._id;
    }

    if (role === "delivery") {
      const newDelivery = await DeliveryPartner.create({
        userId: newUser._id,
        vehicleType: "",
        vehicleNumber: "",
        licenseNumber: "",
        areaAssigned: "",
      });
      roleId = newDelivery._id;
    }

    const token = tokenId(newUser._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        role: newUser.role,
        roleId: roleId,
      },
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({message: `sign up error ${err.message}`});
  }
};

export const signIn = async (req, res) => {
  try {
    const {email, password} = req.body;
    const newUser = await User.findOne({email});
    if (!newUser) return res.status(400).json({message: "User does not Exist"});

    const isMatch = await bcrypt.compare(password, newUser.password);
    if (!isMatch) return res.status(400).json({message: "Wrong password"});

    const role = newUser.role;

    if (!role) {
      return res.status(400).json({message: "Role data not found"});
    }

    let roleId = "";

    if (role === "customer") {
      const newCustomer = await Customer.findOne({userId: newUser._id});
      if (!newCustomer) {
        return res.status(400).json({message: "Customer profile not found"});
      }
      roleId = newCustomer._id;
    }
    if (role === "delivery") {
      const newDelivery = await DeliveryPartner.findOne({userId: newUser._id});
      if (!newDelivery) {
        return res.status(400).json({message: "Delivery Boy profile not found"});
      }
      roleId = newDelivery._id;
    }
    if (role === "vendor") {
      const newVendor = await Vendor.findOne({userId: newUser._id});
      if (!newVendor) {
        return res.status(400).json({message: "Vendor profile not found"});
      }
      roleId = newVendor._id;
    }

    const token = tokenId(newUser._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "user is Logged In",
      user: {
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        role: newUser.role,
        roleId: roleId,
      },
    });
  } catch (err) {
    res.status(500).json({message: `sign in error ${err}`});
  }
};

export const LogOut = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
    });

    res.status(200).json({message: "user Logged out successfully"});
  } catch (err) {
    res.status(500).json({message: `LogOut error ${err.message}`});
  }
};

export const requestOtp = async (req, res) => {
  try {
    const {email} = req.body;
    const user = await User.findOne({email});
    if (!user) return res.status(400).json({message: "User does not Exist"});
    const otp = await sendOtpMail(email);

    user.otp = otp;
    user.otpExpiry = Date.now() + 5 * 60 * 1000;
    user.isOtpVerified = false;

    await user.save();
    res.status(200).json({message: "otp send successfully"});
  } catch (err) {
    res.status(500).json({message: `Error in requestOtp ${err}`});
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const {email, otp} = req.body;
    const user = await User.findOne({email});
    if (!user || !otp || otp.length !== 6) {
      return res.status(400).json({message: "Somthing went wrong"});
    }

    if (user.otp !== otp) {
      return res.status(400).json({message: "Invalid OTP"});
    }

    if (user.otpExpiry < Date.now()) {
      return res.status(400).json({message: "OTP expired"});
    }

    user.isOtpVerified = true;
    user.otp = undefined;
    user.otpExpiry = undefined;

    await user.save();
    return res.status(200).json({message: "otp verified successfully"});
  } catch (err) {
    return res.status(500).json({message: `Error in requestOtp ${err}`});
  }
};

export const resetPassword = async (req, res) => {
  try {
    const {email, password} = req.body;

    if (!email || !password)
      return res.status(400).json({message: "Email and password are required"});

    const user = await User.findOne({email});
    if (!user) return res.status(400).json({message: "User does not exist"});

    if (user.isOtpVerified === false) {
      return res.status(400).json({message: "otp is not verified"});
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.isOtpVerified = false;

    await user.save();
    return res.status(200).json({message: "password changed successfully"});
  } catch (err) {
    return res.status(500).json({message: "Internal server error"});
  }
};
