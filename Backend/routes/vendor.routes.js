import express from 'express';
import isAuth from '../middlewares/isAuth.js'
import { vendorProfile, vendorProfileUpdate } from '../controllers/vendor.controllers.js';

const router = express.Router();

router.get('/profile', isAuth, vendorProfile);

router.put('/profile', isAuth, vendorProfileUpdate);

export default router; 