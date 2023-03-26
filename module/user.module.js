const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
        name:String,
        email:{type:String,unique:true,required:true},
        pass:{type:String,required:true},
        age:Number
})

const UserModule=mongoose.model("user",userSchema)

module.exports={UserModule}