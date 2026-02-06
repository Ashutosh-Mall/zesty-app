import express from 'express';
import isAuth from '../middlewares/isAuth.js';
import {
  createFood,
  viewFood,
  updateFood,
  deleteFood,
  viewAllFoods,
  viewVendorFoods
} from '../controllers/foodItem.controllers.js';

const router = express.Router();

router.get("/", viewAllFoods);

router.get("/vendor/me", isAuth, viewVendorFoods);

router.post("/create", isAuth, createFood);

router.get("/:id", viewFood);

router.put("/:id", isAuth, updateFood);

router.delete("/:id", isAuth, deleteFood);

export default router;
