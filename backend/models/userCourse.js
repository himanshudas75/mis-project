const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userCourseSchema = new Schema({
    registration_number: {
        type: String,
        required: true,
        unique: true,
    },
    courses: [
        {
            course: {
                type: String,
                required: true,
            },
            programme: {
                type: String,
                required: true,
            },
            department: {
                type: String,
                required: true,
            },
        },
    ],
});

module.exports = mongoose.model('UserCourse', userCourseSchema);
