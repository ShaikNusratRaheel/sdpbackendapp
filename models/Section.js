const mongoose = require("mongoose");

const sectionSchema = new mongoose.Schema({
    sectionCode: {
        type: String,
        required: true,
        unique: true
    },
    academicYear: {
        type: Number,
        required: true
    },
    department: {
        type: String,
        required: true,
        enum: ['CSE', 'ECE', 'MECH', 'CIVIL']
    },
    capacity: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Section', sectionSchema);
