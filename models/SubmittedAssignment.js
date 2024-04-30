const mongoose= require('mongoose')

const submittedassignmentschema= new mongoose.Schema({
   
      file: {
        type: String, //URL
        required: true,
      }
      
})

const submittedassignment = mongoose.model('submittedassignment', submittedassignmentschema, "SubmittedAssignment");   //collection name,schema

module.exports = submittedassignment;