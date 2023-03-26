const express=require("express")
const { connection } = require("./db")
const { auth } = require("./middileware/auth.middleware")
const { notesRoutes } = require("./routes/notes.router")
const { userRoutes } = require("./routes/user.routes")
const cors=require("cors")
const app=express()
app.use(express.json())
app.use(cors())

app.use("/users",userRoutes)
app.use("/notes",auth,notesRoutes)

app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("Connected to DB")
    } catch (error) {
        console.log("Unbale to connect to DB")
        console.log(error)
    }
})