const mongoose=require("mongoose")

const notesSchema=mongoose.Schema({
        title:String,
        body:String,
        userId:String
})

const NotesModule=mongoose.model("notes",notesSchema)

module.exports={NotesModule}