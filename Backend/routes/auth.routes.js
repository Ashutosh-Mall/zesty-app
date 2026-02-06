import express from "express";
import { LogOut, requestOtp, resetPassword, signIn, signUp, verifyOtp } from "../controllers/user.controllers.js";
const router = express.Router();

router.post('/signup',signUp);
router.post('/signin',signIn);
router.post('/logout',LogOut);

router.post('/sendotp',requestOtp);
router.post('/verifyotp',verifyOtp);
router.post('/resetpassword',resetPassword)

export default router; 