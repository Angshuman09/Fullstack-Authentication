import express from 'express'
import { isAuthenticated, login, logout, register, resetPassword, sendResetOtp, sendVerifyOtp, verifyEmail } from '../controllers/auth.controller.js';
import auth from '../middlware/auth.middlware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
//middlware for userId
router.post('/send-verify-otp', auth, sendVerifyOtp);
router.post('/verify-account', auth, verifyEmail);
router.get('/isAuth',auth,isAuthenticated);

router.post('/send-reset-otp',sendResetOtp);
router.post('/reset-password',resetPassword);



export default router;