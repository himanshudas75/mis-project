const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const departmentSchema = new Schema({
    name: {
        type: String,
        unique: true,
    },
    programmes: [
        {
            name: String,
            courses: [String],
        },
    ],
});

module.exports = mongoose.model('Department', departmentSchema);
