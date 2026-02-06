import express from "express";
import { createOrder, showAllOrders} from "../controllers/order.controllers.js";
import isAuth from "../middlewares/isAuth.js";

const router = express.Router();

router.post("/create", isAuth, createOrder);
router.get("/orders", isAuth, showAllOrders);

export default router;
