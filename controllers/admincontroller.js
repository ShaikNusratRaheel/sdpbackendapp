const Student = require("../models/Student");
const Faculty = require("../models/Faculty");
const Admin = require("../models/Admin");
const Courses = require("../models/Courses");
const Section = require("../models/Section");
const CourseFacultyAllocation = require('../models/FacultyCourseMap');
const multer = require('multer')   //multer is a package to handle file related operations
const path = require('path')
const fs = require('fs')

const viewstudents = async (request, response) => {
  try {
    const students = await Student.find();
    if (students.length == 0) {
      response.send("DATA NOT FOUND");
    } else {
      response.json(students);
    }
  } catch (error) {
    response.status(500).send(error.message);
  }
};

const viewsections = async (request, response) => {
  try {
    const sections = await Section.find();
    if (sections.length == 0) {
      response.send("DATA NOT FOUND");
    } else {
      response.json(sections);
    }
  } catch (error) {
    response.status(500).send(error.message);
  }
};

const viewfaculty = async (request, response) => {
  try {
    const faculty = await Faculty.find();
    if (faculty.length == 0) {
      response.send("DATA NOT FOUND");
    } else {
      response.json(faculty);
    }
  } catch (error) {
    response.status(500).send(error.message);
  }
};

const viewcoursefacultyallocation = async (req, res) => {
  try {
    const courseFacultyAllocations = await CourseFacultyAllocation.find()
     
    
    if (courseFacultyAllocations.length === 0) {
      res.send("No course faculty allocations found");
    } else {
      res.json(courseFacultyAllocations);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deletestudent = async (request, response) => {
  try {
    const studentid = request.params.studentid;
    const student = await Student.findOne({ studentid: studentid });
    if (student != null) {
      await Student.deleteOne({ studentid: studentid });
      response.send("Deleted Successfully");
    } else {
      response.send("Email ID Not Found");
    }
  } catch (error) {
    response.status(500).send(error.message);
  }
};

const checkadminlogin = async (request, response) => {
  try {
    const input = request.body;
    console.log(input);
    const admin = await Admin.findOne(input);
    response.json(admin);
  } catch (error) {
    response.send("message");
  }
};

const insertstudent = async (request, response) => {
  try {
    const input = request.body;
    const student = new Student(input);
    await student.save();
    response.send("Registered Successfully");
  } catch (e) {
    response.status(500).send(e.message);
  }
};

const insertfaculty = async (request, response) => {
  try {
    const input = request.body;
    const faculty = new Faculty(input);
    await faculty.save();
    response.send("Registered Successfully");
  } catch (e) {
    response.status(500).send(e.message);
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

const createcourse = async (req, res) => {
  try 
      {
        upload(req, res, async function (err) 
        {
          if (err) 
          {
            console.error(err);
            return res.status(500).send(err.message);
          }
          
          const { dept, academicyear, year, semester, coursecode,coursetitle } = req.body;
          const fileName = req.file ? req.file.filename : undefined; // Extracting file name
    
          const newCourse = new Courses({
            dept,
            academicyear,
            year,
            semester,
            coursecode,
            coursetitle,
            file: fileName // Save only the file name
          });
    
          await newCourse.save();
          res.status(200).send('Course Created Successfully');
        });
      } 
      catch (error) 
      {
        console.error(error);
        res.status(500).send(error.message);
      }
};

const viewcourse = async (request, response) => {
  try {
    const course = await Courses.find();
    if (course.length == 0) {
      response.send("DATA NOT FOUND");
    } else {
      response.json(course);
    }
  } catch (error) {
    response.status(500).send(error.message);
  }
};
const deletefaculty = async (request, response) => {
  try {
    const facultyid = request.params.facultyid;
    const faculty = await Faculty.findOne({ facultyid: facultyid });
    if (faculty != null) {
      await Faculty.deleteOne({ facultyid: facultyid });
      response.send("Deleted Successfully");
    } else {
      response.send("Faculty ID Not Found");
    }
  } catch (error) {
    response.status(500).send(error.message);
  }
};

const deletecourse = async (request, response) => {
  try {
    const coursecode = request.params.coursecode;
    const course = await Courses.findOne({ coursecode: coursecode });
    if (course != null) {
      await Courses.deleteOne({ coursecode: coursecode });
      response.send("Deleted Successfully");
    } else {
      response.send("Course Code Not Found");
    }
  } catch (error) {
    response.status(500).send(error.message);
  }
};

const checkusername = async (request, response) => {
  const { username } = request.body;
  try {
    const user = await Admin.findOne({ username });
    if (user) {
      response.send(true);
    } else {
      response.send(false);
    }
  } catch (error) {
    response.status(500).send(error.message);
  }
};

const resetadminpassword = async (request, response) => {
  const { username, newPassword } = request.body;
  try {
    const user = await Admin.findOne({ username });
    if (user) {
      user.password = newPassword;
      await user.save();
      response.send("Password reset successfully");
    } else {
      response.send("Username not found");
    }
  } catch (error) {
    response.status(500).send(error.message);
  }
};

const handoutfile = async (req, res) => 
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



const insertSection = async (req, res) => {
  try {
    const input = req.body;
    const section = new Section(input);
    await section.save();
    res.send("Section created successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const allocateFacultyToCourse = async (req, res) => {
  try {
    const { courseId, facultyId, sectionId } = req.body;
    const allocation = new CourseFacultyAllocation({ course:courseId, faculty: facultyId, section: sectionId });

    // Save the allocation to the database
    await allocation.save();

    res.send("Faculty allocated to course successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
};







module.exports = {
  checkadminlogin,
  viewstudents,
  viewfaculty,
  viewcourse,
  insertstudent,
  insertfaculty,
  createcourse,
  deletestudent,
  deletefaculty,
  deletecourse,
  resetadminpassword,
  checkusername,
  handoutfile,
  allocateFacultyToCourse,
  insertSection,
  viewsections,
  viewcoursefacultyallocation,
  
};