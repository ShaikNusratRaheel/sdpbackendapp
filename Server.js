const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const dburl = process.env.mongodburl
mongoose.connect(dburl).then(() => {
    console.log("Connected to DB Successfully")
}).catch((err) => {
    console.log(err.message)
});


const app = express()
app.use(express.json()) // to parse JSON data
app.use(cors())

const adminrouter = require("./routes/adminroutes")
app.use("",adminrouter) // admin routes

const facultyrouter = require("./routes/facultyroutes")
app.use("",facultyrouter) // faculty routes

const studentrouter = require("./routes/studentroutes")
app.use("",studentrouter) // student routes



const port = 2000
app.listen(port,()=>{
    console.log(`Server is running at port ${port}`)
})