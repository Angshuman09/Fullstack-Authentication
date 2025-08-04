import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.models.js';
import transporter from '../config/nodemailer.js';

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
            process.env.JSON_SECRET_KEY,
            { expiresIn: '7d' }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });


        //nodemailer is used here to send a email
        const mailOption ={
            from:process.env.SENDER_EMAIL,
            to:email,
            subject:`Hii!! ${name}`,
            text:"Welcome to Angshuman corp"
        }

        await transporter.sendMail(mailOption);

        res.status(200).json({ success: true, message: "registration successful" });
    }
    catch (err) {
        res.status(401).json({ success: false, message: err.message });
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.json({ success: false, message: "email or password are needed" });

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ success: false, message: "user is not found" });

        const verifypassword = await bcrypt.compare(password, user.password);
        if (!verifypassword) return res.status(401).json({ success: false, message: "password is incorrect" });

        const token = jwt.sign(
            { id: user._id },
            process.env.JSON_SECRET_KEY,
            {expiresIn:'7d'}
        )

        res.cookie('token',token,{
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        res.status(200).json({success:true,message:"login successful"});
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

//middlware needed
export const logout = async (req,res)=>{
    try {
        res.clearCookie('token',{
             httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
                maxAge: 7 * 24 * 60 * 60 * 1000
        })
    
        res.status(200).json({success:true,message:"logout successfull"});
    } catch (error) {
        res.status(401).json({success:false,message:error.message});
    }
}

export const sendVerifyOtp = async (req,res)=>{
    try {
        const {userId} = req.body;
        const user = await User.findById(userId);
        if(user.isAccountverified) return res.status(401).json({success:false,message:"user is already verified"});
    
        const otp = String(Math.floor(100000 + 900000*Math.random()));
        user.verifyOtp = otp;
        user.expireVerifyOtp = Date.now() + 24*60*60*1000;

        await user.save();

        const mailOption ={
            from:process.env.SENDER_EMAIL,
            to:email,
            subject:`Account verification OTP`,
            text:`Your OTP is ${otp}`
        }

        await transporter.sendMail(mailOption);

    } catch (error) {
        res.status(401).json({success:false,message:"some error occur"});
    }

}

export const verifyEmail = async (req,res)=>{
    const {userId, otp} = req.body;
    if(!userId || !otp) return res.status(401).json({success:false, message:"Missing details"});

    try {
        const user = await User.findById(userId);

        if(!user) return res.status(401).json({success:false, message:"user not found"});

        if(user.verifyOtp==='' || user.verifyOtp!=otp){
            return res.status(401)
            .json({success:false,message:"Invalid OTP"});
        }

        if(user.expireVerifyOtp<Date.now()){
             return res.status(401)
            .json({success:false,message:"OTP is expired"});
        }

        user.isAccountverified=true;
        user.verifyOtp='';
        user.expireVerifyOtp=0;

        user.save();

        res.status(200).json({success:true, message:"user verified successful"});

    } catch (error) {
        res.status(401)
        .json({success:false,message:error.message});
    }
}