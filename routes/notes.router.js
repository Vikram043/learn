const express=require("express")
const { NotesModule } = require("../module/notes.model")
const notesRoutes=express.Router()
const jwt=require("jsonwebtoken")


notesRoutes.get("/",async(req,res)=>{
    const token=req.headers.authorization
   try {
        let decode=jwt.verify(token,"bruce")
    if(decode){
        const notes=await NotesModule.find({"userId":decode.userId})
        res.status(200).send(notes)
    }
   } catch (error) {
    res.status(400).send({message:error.message})
   }
})

notesRoutes.post("/create",async(req,res)=>{
    const payload=req.body
    try {
       const notes=new NotesModule(payload)
       await notes.save()
       res.status(200).send({message:"New Notes added"}) 
    } catch (error) {
        res.status(400).send({message:error.message})
    }
})

notesRoutes.delete("/delete/:id",async(req,res)=>{
    const notesId=req.params.id
    try {
      await NotesModule.findByIdAndDelete({_id:notesId})
       res.status(200).send({message:`Notes with id ${notesId} deleted`}) 
    } catch (error) {
        res.status(400).send({message:error.message})
    }
})

notesRoutes.patch("/update/:id",async(req,res)=>{
    const payload=req.body
    const notesId=req.params.id
    try {
      await NotesModule.findByIdAndUpdate({_id:notesId},payload)
       res.status(200).send({message:`Notes with id ${notesId} updated`}) 
    } catch (error) {
        res.status(400).send({message:error.message})
    }
})



module.exports={notesRoutes}
