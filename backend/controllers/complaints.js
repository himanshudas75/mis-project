const Complaint = require('../models/complaint');
const User = require('../models/user');
const { cloudinary } = require('../utils/cloudinary');
// const axios = require('axios');

module.exports.register = async (req, res, next) => {
    const {
        order_no,
        contact_no,
        registered_email_id,
        complaint_type,
        complaint_details,
        payment_type,
    } = req.body;

    console.log('HERE');

    // const check_user = await User.findOne({
    //     email: registered_email_id,
    //     mobile_number: contact_no,
    // });

    // if (!check_user) {
    //     await cloudinary.uploader.destroy(req.file.filename);
    //     return next({
    //         statusCode: 404,
    //         message: 'Mobile number or email address not registered',
    //     });
    // }

    const check_complaint = await Complaint.findOne({ order_number: order_no });
    if (check_complaint) {
        // await cloudinary.uploader.destroy(req.file.filename);
        return next({
            statusCode: 409,
            message: 'A complaint with this Order Number already exists',
        });
    }

    // Fix here accordingly if complaint for one user only or for multiple users
    const complaint = new Complaint({
        order_number: order_no,
        registered_mobile_number: contact_no,
        registered_email: registered_email_id,
        complaint_type: complaint_type,
        complaint_details: complaint_details,
        payment_type: payment_type,
        user: req.user._id,
        complaint_status: 'Pending',
    });

    // complaint.screenshot = {
    //     url: req.file.path,
    //     filename: req.file.filename,
    // };

    const savedComplaint = await complaint.save();

    // Contact Grievance Management System
    // const data = {
    //     type: 'PG Complaint',
    //     description: req.user.identity,
    // };
    // const config = {
    //     withCredentials: true,
    //     headers: {
    //         'Access-Control-Allow-Origin': '*',
    //         'Content-Type': 'application/json',
    //     },
    // };
    // try {
    //     const res = await axios.post(process.env.API_TIKCET_SEND, data, config);
    // } catch (e) {
    //     console.log(e);
    // }

    res.json({
        success: true,
        message: 'Complaint Registered Successfully',
        order_number: order_no,
    });
};

// Modify this to add tracking feature and search by email id
module.exports.fetch = async (req, res, next) => {
    if (req.query.order_number) {
        const order_number = req.query.order_number;
        complaint = await Complaint.findOne({ order_number });
        if (!complaint) {
            return next({
                statusCode: 404,
                message: 'Complaint not found',
            });
        }
    } else {
        return next({
            statusCode: 404,
            message: 'Missing query parameters',
        });
    }

    res.json({
        success: true,
        message: 'Complaint fetched successfully',
        complaint: complaint,
    });
};

module.exports.track = async (req, res, next) => {
    const { entity, order_no, registered_email_id } = req.body;

    const status = ['Not Found'];

    if (entity === 'order_no') {
        const complaint = await Complaint.findOne({ order_number: order_no });
        if (complaint) {
            status.pop();
            status.push(complaint.complaint_status);
        }
    } else if (entity === 'registered_email_id') {
        const complaints = await Complaint.find({
            registered_email: registered_email_id,
        });
        if (complaints.length === 0) {
        } else {
            status.pop();
            for (const c of complaints) {
                status.push(
                    `Order: ${c?.order_number}, Status: ${c?.complaint_status}`
                );
                console.log(c);
                console.log(status);
            }
        }
    }

    res.json({
        success: true,
        message: 'Status fetched successfully',
        status: status,
    });
};

module.exports.reset = async (req, res, next) => {
    let complaint = null;
    if (req.query.order_number) {
        const order_number = req.query.order_number;
        complaint = await Complaint.findOneAndDelete({ order_number });
        if (!complaint) {
            return next({
                statusCode: 404,
                message: 'Complaint not found',
            });
        }
    } else {
        return next({
            statusCode: 404,
            message: 'Missing query parameters',
        });
    }

    await cloudinary.uploader.destroy(complaint.screenshot.filename);
    res.json({
        success: true,
        message: 'Complaint deleted successfully',
        complaint: complaint,
    });
};
