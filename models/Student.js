const mongoose = require("mongoose")

const studentschema = new mongoose.Schema({
    studentid:{
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
  program: {
    type:String,
    required: true,
    enum: ['BTECH', 'MTECH']
  },
  semester: {
    type:String,
    required: true,
    enum: [ 'ODD', 'EVEN']
  },
  year: {
    type:Number,
    required: true
},

    dateofbirth: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true,
      default:"klu123"
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
   
    contact: {
        type: String,
        required: true,
        unique:true
      },

  });

const student = mongoose.model('student', studentschema , "Student");

module.exports = student;