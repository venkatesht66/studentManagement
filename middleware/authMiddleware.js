const dotEnv = require('dotenv');
const jwt = require('jsonwebtoken');
dotEnv.config();

const authMiddleware = (req,res,next)=>{
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer")){
        return res.status(401).json({message:"Access Denied"});
    }

    const token = authHeader.split(" ")[1];
    try{
        const verified = jwt.verify(token,process.env.secretKey);
        req.user = verified;

        if(!req.user){
            return res.status(401).json({message:"Access Denied"});
        }
        next();
        
    }catch(error){
        res.status(500).json({message:"Server Error"});
        console.error(`The error is : ${error}`);
    }

}

module.exports = {authMiddleware};