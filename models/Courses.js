const mongoose = require("mongoose")

const courseschema = new mongoose.Schema({
    dept: {
      type: String,
      required: true,
      enum:['CSE', 'ECE', 'MECH' , 'CIVIL']
      
    },
    academicyear: {
      type: Number,
      required: true
      
    },
    year:{
        type:Number,
        required:true
    },
    semester:{
        type:String,
        required: true,
        enum: [ 'ODD', 'EVEN']
    },
    coursecode:{
        type: String,
        required: true,
        unique: true
    },
    coursetitle:{
        type: String,
        required: true
    },
    file: {
      type: String, //URL
      required: true,
    },
  });

const course = mongoose.model('course', courseschema, "Course");   //collection name,schema

module.exports = course;