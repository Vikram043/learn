const express=require("express")
const { UserModule } = require("../module/user.module")
const userRoutes=express.Router()
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")


userRoutes.post("/register",async(req,res)=>{
    const {name,email,pass,age}=req.body

    try {
        const use=await UserModule.findOne({email})
        if(!use){
            bcrypt.hash(pass,5,async(err,hash)=>{
                if(err){
                    res.status(400).send({message:err.message}) 
                }else{
                    const user=new UserModule({name,email,pass:hash})
                    await user.save()
                    res.status(200).send({message:"User Registered"})
                }
                })
        }else{
            res.status(400).send({message:"Email already in use"})  
        }
    } catch (error) {
        res.status(400).send({message:error.message})
    }
})

userRoutes.post("/login",async(req,res)=>{
    const {email,pass}=req.body
    try {
        const user=await UserModule.findOne({email})
        if(user){
            bcrypt.compare(pass,user.pass,(err,decode)=>{
                if(decode){
                    let token=jwt.sign({userId:user.id},"bruce",{expiresIn:"1h"})
                    res.status(200).send({message:"Loggedd in","token":token})    
                }else{
                    res.status(400).send({message:"wrong password"})     
                }
            })
        }else{
            res.status(400).send({message:"Please register first"})
        }
    } catch (error) {
        res.status(400).send({message:error.message})
    }
})




module.exports={userRoutes}