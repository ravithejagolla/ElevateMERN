import env from 'dotenv'
env.config()
import User from '../models/userSchema.js'
import argon2 from 'argon2'
import jwt from 'jsonwebtoken'


export const register=async (req,res) => {
    const {username,email,password}=req.body
    try{
        const exituser=await User.findOne({email})
        if(exituser){
            return res.json({messege:"User Already exit Please Login"})
        }
        const hashedpassword=await argon2.hash(password)
        const newuser= new User({
            username:username,
            email:email,
            password:hashedpassword
        })
        newuser.save()
        res.status(201).json({
            messege:"User Registred Successfully"
        })
    }catch(e){
        console.log(e)
        res.status(500).json({
            messege:"Internal Server Error"
        })
    }
    
}
export const login=async (req,res) => {
    const {email,password}=req.body
    const JWT_SECRET=process.env.JWT_SECRET
    try{
        const user= await User.findOne({email})
        const isvalidUser= await argon2.verify(password,user.password)
        if(!user){
            return res.status(404).send("User Not found Please Register")
        }
        if(!isvalidUser){
            return res.status(401).send("User not a valid user")
        }
        const token=jwt.sign(password,JWT_SECRET,{expiresIn:"48hr"})
        res.status(200).json({
            messege:"User Logged in Successfully",
            token
        })

    }catch(e){
        console.log(e)
        
    }
    
}

export const allusers=async (req,res) => {
    try{
        const alluser= await User.find()
        res.status(200).json({
            messege:"All Available users",
            alluser
        })
    }catch(e){
        console.log(e)
         res.status(500).json({
            messege:"Internal Server Error"
        })
    }
    
}