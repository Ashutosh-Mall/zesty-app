import express from "express";
import {
  profile,
  deliveryBoyProfileUpdate,
} from "../controllers/deliveryPatner.controllers.js";

import isAuth from "../middlewares/isAuth.js";
const router = express.Router();

router.get("/profile", isAuth, profile);

router.put("/profile/update", isAuth, deliveryBoyProfileUpdate);

export default router;
