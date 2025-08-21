import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.models.js';
import transporter from '../config/nodemailer.js';
import {FIRST_REGISTER} from '../config/emailTamplates.js';
import { OTP_VERFICATION } from '../config/emailTamplates.js';
import { RESET_PASSWORD_OTP } from '../config/emailTamplates.js';
//register
export const register = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(401).json({ success: false, error: "missing details" });
    }

    try {
        const existedUser = await User.findOne({ email });
        if (existedUser) {
            return res.status(401).json({ success: false, error: "user already exist" });
        }
        const hashpassword = await bcrypt.hash(password, 10);

        const user = new User({ name, email, password: hashpassword });

        await user.save();

//         const accessToken = jwt.sign(..., { expiresIn: '15m' });
// const refreshToken = jwt.sign(..., { expiresIn: '7d' });

// res.cookie("access_token", accessToken, { httpOnly: true });
// res.cookie("refresh_token", refreshToken, { httpOnly: true });

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '7d' }
        );

       res.cookie("token", token, {
            httpOnly: true,
            secure: true, // Always true since you're using HTTPS
            sameSite: "none", // Required for cross-origin cookies
            maxAge: 7 * 24 * 60 * 60 * 1000,
            domain: process.env.NODE_ENV === "production" ? ".vercel.app" : undefined // Add domain for Vercel
        });


        //nodemailer is used here to send a email
        const mailOption ={
            from:process.env.SENDER_EMAIL,
            to:email,
            subject:`Hi ${name}, Welcome to Angshuman Corporation 🎉`,
            html:FIRST_REGISTER(name)
        }

        await transporter.sendMail(mailOption);

        res.status(200).json({ success: true, message: "registration successful" });
    }
    catch (err) {
        res.status(401).json({ success: false, message: err.message });
    }
}

//login
export const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.json({ success: false, message: "email or password are needed" });

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(409).json({ success: false, message: "user is not found" });

        const verifypassword = await bcrypt.compare(password, user.password);
        if (!verifypassword) return res.status(405).json({ success: false, message: "password is incorrect" });

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET_KEY,
            {expiresIn:'7d'}
        )

        res.cookie("token", token, {
            httpOnly: true,
            secure: true, // Always true since you're using HTTPS
            sameSite: "none", // Required for cross-origin cookies
            maxAge: 7 * 24 * 60 * 60 * 1000,
            domain: process.env.NODE_ENV === "production" ? ".vercel.app" : undefined // Add domain for Vercel
        });

        res.status(200).json({success:true,message:"login successful"});
    } catch (error) {
        res.status(402).json({ success: false, message: error.message });
    }
}

//logout
export const logout = async (req,res)=>{
    try {
      res.cookie("token", token, {
            httpOnly: true,
            secure: true, // Always true since you're using HTTPS
            sameSite: "none", // Required for cross-origin cookies
            maxAge: 7 * 24 * 60 * 60 * 1000,
            domain: process.env.NODE_ENV === "production" ? ".vercel.app" : undefined // Add domain for Vercel
    });
    
        res.status(200).json({success:true,message:"logout successfull"});
    } catch (error) {
        res.status(401).json({success:false,message:error.message});
    }
}


//send verify otp
export const sendVerifyOtp = async (req,res)=>{
    try {
        const {userId} = req.body;
        const user = await User.findById(userId);
        if(user.isAccountVerified) return res.status(401).json({success:false,message:"user is already verified"});
    
        const otp = String(Math.floor(100000 + 900000*Math.random()));
        user.verifyOtp = otp;
        user.expireVerifyOtp = Date.now() + 24*60*60*1000;

        await user.save();

        const mailOption ={
            from:process.env.SENDER_EMAIL,
            to:user.email,
            subject:`Account verification OTP`,
            html: OTP_VERFICATION(user.name,otp)
        }

        await transporter.sendMail(mailOption);
        res.status(200).json({success:true, message:"otp send successfully"});

    } catch (error) {
        res.status(401).json({success:false,message:"some error occur"});
    }

}


//verify email
export const verifyEmail = async (req,res)=>{
    const {userId, otp} = req.body;
    if(!userId || !otp) return res.status(401).json({success:false, message:"Missing details"});

    try {
        const user = await User.findById(userId);

        if(!user) return res.status(401).json({success:false, message:"user not found"});

        if(user.verifyOtp==='' || user.verifyOtp!==otp){
            return res.status(405)
            .json({success:false,message:"Invalid OTP"});
        }

        if(user.expireVerifyOtp<Date.now()){
             return res.status(401)
            .json({success:false,message:"OTP is expired"});
        }

        user.isAccountVerified=true;
        user.verifyOtp='';
        user.expireVerifyOtp=0;

        await user.save();

        res.status(200).json({success:true, message:"user verified successful"});

    } catch (error) {
        res.status(409)
        .json({success:false,message:error.message});
    }
}

//is authenticated
export const isAuthenticated = async (req,res)=>{
    try {
        res.status(201).json({success:true})
    } catch (error) {
        res.status(401).json({success:false,message:error.message});
    }
}


//send reset otp
export const sendResetOtp = async (req,res)=>{
    const {email} = req.body;
    if(!email){
        return res.status(405).json({success:false,message:"email is required"});
    }
    try {
        const user = await User.findOne({email});
        if(!user){
            return res.status(407).json({success:false,message:"user not found"});
        }

        const otp = String(Math.floor(100000 + 900000*Math.random()));
        user.resetOtp = otp;
        user.expireResetOtp = Date.now() + 15*60*1000;

        await user.save();

        const mailOption ={
            from:process.env.SENDER_EMAIL,
            to:user.email,
            subject:`Account Reset OTP`,
            html: RESET_PASSWORD_OTP(user.name,otp)
        }

        await transporter.sendMail(mailOption);
        res.status(200).json({success:true, message:"Reset otp send successfully"});

    } catch (error) {
        res.status(409).json({success:false,message:"reset otp error"});
    }

}


//reset password
export const resetPassword = async (req,res)=>{
    const {email,otp,newPassword} = req.body;
    if(!email || !otp || !newPassword){
        return res.status(409).json({success:false,message:"Details requried"});
    }
    try {
        const user = await User.findOne({email});
        if(!user){
            return res.status(407).json({success:false,message:"user is not found"});
        }

        if(user.resetOtp=='' || user.resetOtp!=otp){
            return res.status(402).json({success:false,message:"Invalid OTP"});
        }

        if(user.expireResetOtp<Date.now()){
            return res.status(400).json({success:false,message:"OTP Expired"});
        }

        const hashPassword = await bcrypt.hash(newPassword,10);
        user.password = hashPassword;
        user.resetOtp = "";
        user.expireResetOtp = 0;
        await user.save();

        res.status(200).json({success:true,message:"password reset successful"});
        
    } catch (error) {
        return res.status(401).json({success:false,message:error.message});
    }
}
