const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
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
});

courseSchema.index(
    { course: 1, programme: 1, department: 1 },
    { unique: true }
);

module.exports = mongoose.model('Course', courseSchema);
