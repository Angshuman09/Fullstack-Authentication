import jwt, { decode } from 'jsonwebtoken';

const auth = async (req,res,next)=>{
    const {token}=req.cookies;

    if(!token){
        return res.status(400).json({success:false, message:"Authorization denied"});
    }

    try {
        const decodedtoken = jwt.verify(token, process.env.JWT_SECRET_KEY);

        if(decodedtoken.id){
            req.body.userId = decodedtoken.id;
        }else{
            return res.status(400).json({success:false, message:"Authorization denied"});
        }

        next();
    } catch (error) {
        res.status(400).json({success:false, message:error.message});
    }
}

export default auth;