import jwt, { decode } from 'jsonwebtoken';

const auth = async (req,res,next)=>{
    const {token}=req.cookies;

    if(!token){
        return res.status(403).json({success:false, message:"Authorization denied"});
    }

    try {
        const decodedtoken = jwt.verify(token, process.env.JWT_SECRET_KEY);

        //if body is empty we add this for safety
        if(!req.body){ req.body = {};}

        if(decodedtoken.id){
            req.body.userId = decodedtoken.id;
        }else{
            return res.status(400).json({success:false, message:"Authorization denied"});
        }

        next();
    } catch (error) {
        res.status(404).json({success:false, message:error.message});
    }
}

export default auth;