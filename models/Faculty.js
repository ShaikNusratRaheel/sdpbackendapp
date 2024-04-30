const mongoose = require("mongoose")

const facultyschema = new mongoose.Schema({
    facultyid:{
        type: Number,
        required:true,
        unique:true
    },
    fullname: {
      type: String,
      required: true
    },
    gender: {
      type: String,
      required:true,
      enum: ['male', 'female', 'others']
    },
    department: {
        type:String,
        required: true,
        enum: ['CSE', 'ECE', 'MECH' , 'CIVIL']
    },
    designation:{
      type: String,
      required: true,
      enum: ['MTECH','PHD'],
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
      default:"klef1234"
    },
    contact: {
        type: String,
        required: true,
        unique:true
      },
      address: {
        type: String,
        required: true
      },
  });

const faculty = mongoose.model('faculty', facultyschema , "Faculty");

module.exports = faculty;