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
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    complaint_type: {
        type: String,
        required: true,
        enum: ['Civil', 'Electric'],
    },
    complaint_details: {
        type: String,
        required: true,
    },
    payment_type: {
        type: String,
        required: true,
        enum: ['PayTM', 'GPay'],
    },
    screenshot: {
        type: imageSchema,
        required: true,
    },
});

module.exports = mongoose.model('Complaint', complaintSchema);
