const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const createAdmin = async(req,res)=>{
    try{
        const {name,email,password,phone} = req.body;
        const hashedPassword = await bcrypt.hash(password,10);
        const admin = new Admin({
            name,
            email,
            password:hashedPassword,
            phone
        })
        await admin.save()
        res.status(200).json({message:"Admin Created Successfully"});
    }catch(error){
        console.error(`There is a Error:${error}`);
        res.status(500).json({message:"Server Error"});
    }
}

const adminLogin = async(req,res)=>{
    try {
        const {email,password} = req.body;
        const admin = await Admin.findOne({email});
        if (!admin){
            return res.status(404).json({message:"Invalid Email"});
        }

        const isPasswordMatches =await bcrypt.compare(password,admin.password);

        if (!isPasswordMatches){
            return res.status(404).json({message:"incorrect password"});
        }
        
        const payload = {email:email};
        const jwtToken = jwt.sign(payload,process.env.secretKey);

        res.send({token:jwtToken});
    } catch (error) {
        console.error(`There is a Error:${error}`);
        res.status(500).json({message:"Server Error"});
    }
}

module.exports = {createAdmin,adminLogin};