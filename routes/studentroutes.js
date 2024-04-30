const studentcontroller = require("../controllers/studentcontroller")

const express = require("express")
const studentrouter = express.Router()


studentrouter.post("/checkstudentlogin",studentcontroller.checkstudentlogin)
studentrouter.post("/resetstudentpassword",studentcontroller.resetstudentpassword)
studentrouter.post("/checkstudentid",studentcontroller.checkstudentid)
// studentrouter.post("/createevent",studentcontroller.createevent)
// studentrouter.post("/viewevents",studentcontroller.viewevents)
// studentrouter.post("/eventimage",studentcontroller.eventimage)
studentrouter.post('/submitassignment',studentcontroller.submitassignment)


module.exports = studentrouter