const Student = require("../models/Student")
const SubmittedAssignment= require('../models/SubmittedAssignment')
const multer=require('multer')
  const checkstudentlogin = async (request, response) => 
  {
     try 
     {
       const input = request.body
       const student = await Student.findOne(input)
       response.json(student)
     } 
     catch (error) 
     {
       response.status(500).send(error.message);
     }
   };

   const checkstudentid = async (request, response) => {
    const { studentid } = request.body;
    try {
      const user = await Student.findOne({ studentid });
      if (user) {
        response.send(true);
      } else {
        response.send(false);
      }
    } catch (error) {
      response.status(500).send(error.message);
    }
  };

  const resetstudentpassword = async (request, response) => {
    const { studentid, newPassword } = request.body;
    try {
      const user = await Student.findOne({ studentid });
      if (user) {
        user.password = newPassword;
        await user.save();
        response.send('Password reset successfully');
      } else {
        response.send('studentid not found');
      }
    } catch (error) {
      response.status(500).send(error.message);
    }
  };



  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './media/'); // Destination folder
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname); // File naming convention
    }
  });
  const upload = multer({ storage: storage }).single('file');

  const submitassignment = async (req, res) => {
  try 
      {
        upload(req, res, async function (err) 
        {
          if (err) 
          {
            console.error(err);
            return res.status(500).send(err.message);
          }
          
          
          const fileName = req.file ? req.file.filename : undefined; // Extracting file name
    
          const newAssignment = new SubmittedAssignment({
            file: fileName // Save only the file name
          });
    
          await newAssignment.save();
          res.status(200).send('Assignment Submitted Successfully');
        });
      } 
      catch (error) 
      {
        console.error(error);
        res.status(500).send(error.message);
      }
};


  module.exports = {checkstudentlogin,checkstudentid,resetstudentpassword,submitassignment}