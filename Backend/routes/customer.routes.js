import express from "express";
import {
  customerProfile,
  customerProfileUpdate,
} from "../controllers/customer.controllers.js";
import isAuth from "../middlewares/isAuth.js";

const router = express.Router();

// Get customer profile
router.get("/profile", isAuth, customerProfile);

// Update customer profile
router.put("/profile", isAuth, customerProfileUpdate);

export default router;
