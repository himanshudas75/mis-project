const Complaint = require('../models/complaint');
const User = require('../models/user');

module.exports.register = async (req, res, next) => {
    const {
        order_number,
        registered_mobile_number,
        registered_email,
        complaint_type,
        complaint_details,
        payment_type,
        screenshot,
    } = req.body;

    const check_user = await User.findOne({
        email: registered_email,
        mobile_number: registered_mobile_number,
    });
    if (!check_user) {
        return next({
            statusCode: 404,
            message: 'Mobile number or email address not registered',
        });
    }

    const check_complaint = await Complaint.findOne({ order_number });
    if (check_complaint) {
        return next({
            statusCode: 409,
            message: 'A complaint with this Order Number already exists',
        });
    }

    // Fix here accordingly if complaint for one user only or for multiple users
    const complaint = new Complaint({
        order_number: order_number,
        complaint_type: complaint_type,
        complaint_details: complaint_details,
        payment_type: payment_type,
        user: req.user._id,
        screenshot: screenshot,
    });

    const savedComplaint = await complaint.save();

    res.json({
        success: true,
        message: 'Complaint Registered Successfully',
        order_number: order_number,
    });
};

// Modify this to add tracking feature and search by email id
module.exports.fetch = async (req, res, next) => {
    let complaint = null;
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
