const facultycontroller = require("../controllers/facultycontroller")

const express = require("express")
const facultyrouter = express.Router()


facultyrouter.post("/checkfacultylogin",facultycontroller.checkfacultylogin)
facultyrouter.post("/checkemail",facultycontroller.checkemail)
facultyrouter.post("/resetfacultypassword",facultycontroller.resetfacultypassword)
facultyrouter.post('/postassignment',facultycontroller.postassignment)
facultyrouter.get("/viewassignment",facultycontroller.viewassignment)

facultyrouter.get("/assignmentfile/:filename",facultycontroller.assignmentfile)


module.exports = facultyrouter