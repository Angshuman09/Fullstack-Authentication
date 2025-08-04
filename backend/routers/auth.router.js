import express from 'express'
import { login, logout, register, sendVerifyOtp, verifyEmail } from '../controllers/auth.controller.js';
import auth from '../middlware/auth.middlware.js';

const router = express.Router();

router.post('/register',register);
router.post('/login',login);
router.post('/logout',logout);
router.post('/send-verify-otp',auth,sendVerifyOtp);
router.post('/verify-account',auth,verifyEmail);

export default router;