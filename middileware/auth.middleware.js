const jwt=require("jsonwebtoken")


const auth=(req,res,next)=>{
    const token=req.headers.authorization
    if(token){
        jwt.verify(token,"bruce",(err,decoded)=>{
           if(decoded){
              req.body.userId=decoded.userId
              next()
            }else{
                res.status(400).send({message:"Please login first"})
            }
          })
      }else{
        res.status(400).send({message:"Please login first"})
      }   
   }


   module.exports={auth}