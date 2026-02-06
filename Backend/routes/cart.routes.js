import express from "express";
import {
  viewCart,
  addToCart,
  removeFromCart,
} from "../controllers/cart.controllers.js";
import isAuth  from "../middlewares/isAuth.js";

const router = express.Router();

router.get("/", isAuth, viewCart);
router.post("/add", isAuth, addToCart);
router.post("/remove", isAuth, removeFromCart);

export default router;
