const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imageSchema = new Schema({
    url: String,
    filename: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const complaintSchema = new Schema({
    order_number: {
        type: String,
        required: true,
        unique: true,
    },
    registered_mobile_number: {
        type: String,
        required: true,
    },
    registered_email: {
        type: String,
        required: true,
    },
    complaint_type: {
        type: String,
        required: true,
    },
    complaint_details: {
        type: String,
        required: true,
    },
    payment_type: {
        type: String,
        required: true,
    },
    screenshot: {
        type: imageSchema,
        // required: true,
    },
});

module.exports = mongoose.model('Complaint', complaintSchema);
