const mongoose= require('mongoose')

const assignmentschema= new mongoose.Schema({
    name: {
        type: String,
        required: true,
        
        
      },
      coursetitle: {
        type: String,
        required: true
        
      },
      coursecode:{
          type:String,
          required:true
      },
      
      deadline:{
          type: String,
          required: true,
          
      },
      file: {
        type: String, //URL
        required: true,
      }
      
})

const assignment = mongoose.model('assignment', assignmentschema, "Assignment");   //collection name,schema

module.exports = assignment;