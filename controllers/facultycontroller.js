const Faculty = require("../models/Faculty")
// const Student = require("../models/Student")
const Assignment= require('../models/Assignment')
const multer = require('multer')   //multer is a package to handle file related operations
const path = require('path')
const fs = require('fs')

  const checkfacultylogin = async (request, response) => 
  {
     try 
     {
       const input = request.body
       const faculty = await Faculty.findOne(input)
       response.json(faculty)
     } 
     catch (error) 
     {
       response.status(500).send(error.message);
     }
   };

   const checkemail = async (request, response) => {
    const { email } = request.body;
    try {
      const user = await Faculty.findOne({ email });
      if (user) {
        response.send(true);
      } else {
        response.send(false);
      }
    } catch (error) {
      response.status(500).send(error.message);
    }
  };

  const resetfacultypassword = async (request, response) => {
    const { email, newPassword } = request.body;
    try {
      const user = await Faculty.findOne({ email });
      if (user) {
        user.password = newPassword;
        await user.save();
        response.send('Password reset successfully');
      } else {
        response.send('email not found');
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

  const postassignment = async (req, res) => {
  try 
      {
        upload(req, res, async function (err) 
        {
          if (err) 
          {
            console.error(err);
            return res.status(500).send(err.message);
          }
          
          const { name, coursetitle, coursecode, deadline  } = req.body;
          const fileName = req.file ? req.file.filename : undefined; // Extracting file name
    
          const newAssignment = new Assignment({
            name,
            coursetitle,
            coursecode,
            deadline,
            file: fileName // Save only the file name
          });
    
          await newAssignment.save();
          res.status(200).send('Assignment Posted Successfully');
        });
      } 
      catch (error) 
      {
        console.error(error);
        res.status(500).send(error.message);
      }
};

const viewassignment = async (request, response) => {
  try {
    const assignment = await Assignment.find();
    if (assignment.length == 0) {
      response.send("DATA NOT FOUND");
    } else {
      response.json(assignment);
    }
  } catch (error) {
    response.status(500).send(error.message);
  }
};
   
const assignmentfile = async (req, res) => 
{
  const filename = req.params.filename;
  const filepath = path.join(__dirname, '../media', filename);
  console.log(filepath)

    fs.readFile(filepath, (err, data) => {
      if (err) 
      {
        console.error(err);
        return res.status(500).send('Error reading image file');
      }
     
    const ext = path.extname(filename).toLowerCase();
    let contentType = 'application/octet-stream'; // Default to octet-stream (binary data)

if (ext === '.png') {
  contentType = 'image/png';
} else if (ext === '.jpg' || ext === '.jpeg') {
  contentType = 'image/jpeg';
} else if (ext === '.pdf') {
  contentType = 'application/pdf';
} else if (ext === '.txt') {
  contentType = 'text/plain';
}

    res.setHeader('Content-Type', contentType);
      res.send(data);
    })
}
  
   
   

  

  module.exports = {checkfacultylogin,checkemail,resetfacultypassword,postassignment,viewassignment,assignmentfile}