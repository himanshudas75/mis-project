const Application = require('../models/application');
const User = require('../models/user');
const { cloudinary } = require('../utils/cloudinary');
// const axios = require('axios');

module.exports.submit = async (req, res, next) => {
    const data = req.body;

    const find_form = await Application.findOne({
        registration_number: req.user.identity,
    });

    if (find_form) {
        Object.keys(data).forEach((key) => {
            find_form[key] = data[key];
        });
        console.log('HERE');
        console.log(find_form);
        // console.log(data);

        await find_form.save();

        // if (find_form.steps_reached === 4) {
        //     const data = {
        //         type: 'PG Application Submit',
        //         description: req.user.identity,
        //     };
        //     const config = {
        //         withCredentials: true,
        //         headers: {
        //             'Access-Control-Allow-Origin': '*',
        //             'Content-Type': 'application/json',
        //         },
        //     };
        //     try {
        //         const res = await axios.post(
        //             process.env.API_TIKCET_SEND,
        //             data,
        //             config
        //         );
        //     } catch (e) {
        //         console.log(e);
        //     }
        // }
    } else {
        const new_data = { registration_number: req.user.identity, ...data };
        delete new_data.registration_no;
        const application = new Application(new_data);
        const savedComplaint = await application.save();
    }

    // console.log('HERE');

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

    // const check_complaint = await Complaint.findOne({ order_number: order_no });
    // if (check_complaint) {
    //     // await cloudinary.uploader.destroy(req.file.filename);
    //     return next({
    //         statusCode: 409,
    //         message: 'A complaint with this Order Number already exists',
    //     });
    // }

    // Fix here accordingly if complaint for one user only or for multiple users
    // const complaint = new Complaint({
    //     order_number: order_no,
    //     registered_mobile_number: contact_no,
    //     registered_email: registered_email_id,
    //     complaint_type: complaint_type,
    //     complaint_details: complaint_details,
    //     payment_type: payment_type,
    //     user: req.user._id,
    // });

    // complaint.screenshot = {
    //     url: req.file.path,
    //     filename: req.file.filename,
    // };

    res.json({
        success: true,
        message: 'Application Form Submitted Successfully',
        registration_number: req.user.identity,
    });
};

module.exports.getSteps = async (req, res, next) => {
    const application = await Application.findOne({
        registration_number: req.user.identity,
    });
    var value = 0;
    if (application) {
        value = application.steps_reached;
    }

    res.json({
        success: true,
        message: 'Successfully fetched steps reached',
        steps: value,
    });
};
