import User from "../models/user.models.js";

export const getData = async (req,res)=>{
    const {userId} = req.body;
    if(!userId){
        res.status(400).json({success:false,message:"userId not found"});
    }

    try {
        const user = await User.findById(userId);
        res.status(200).json({
            success:true,
            userData:{
                name:user.name,
                isAccountVerified:user.isAccountVerified
            }
        })
    } catch (error) {
        res.status(401).json({success:false,message:"getting problem to get data"});
    }


}