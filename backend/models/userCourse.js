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
            type: Schema.Types.ObjectId,
            ref: 'Course',
        },
    ],
});

module.exports = mongoose.model('UserCourse', userCourseSchema);
