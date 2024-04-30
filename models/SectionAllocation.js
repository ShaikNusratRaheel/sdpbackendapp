const mongoose = require("mongoose");

const sectionStudentSchema = new mongoose.Schema({
    section: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Section',
        required: true
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    }
});

module.exports = mongoose.model('SectionStudent', sectionStudentSchema);
