const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    registration_number: {
        type: String,
        required: true,
        unique: true,
    },
    first_name: {
        type: String,
        required: true,
    },
    midde_name: {
        type: String,
    },
    last_name: {
        type: String,
    },
    category: {
        type: String,
        required: true,
        enum: ['General', 'OBC(NCL)', 'EWS', 'SC', 'ST'],
    },
    divyang: {
        type: Boolean,
        required: true,
    },
    mobile_number: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    date_of_birth: {
        type: Date,
        required: true,
    },
    math_or_stat_degree: {
        type: Boolean,
        required: true,
    },
    btech_degree: {
        type: Boolean,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    roles: {
        type: [String],
        required: true,
    },
});

module.exports = mongoose.model('User', userSchema);
