const User = require('../models/user');
const { hashSync, compareSync } = require('bcrypt');
const jwt = require('jsonwebtoken');

const generateToken = (user, token_type) => {
    const payload = {
        user_id: user._id,
        username: user.username,
    };

    const options = {
        expiresIn: '1d',
    };

    secret = process.env.ACCESS_TOKEN_SECRET;

    const token = jwt.sign(payload, secret, options);
    return token;
};

module.exports.register = async (req, res, next) => {
    const {
        first_name,
        midde_name,
        last_name,
        category,
        divyang,
        mobile_number,
        email,
        date_of_birth,
        gender,
        blood_group,
        father_name,
        color_blindness,
        password,
        createdAt,
    } = req.body;

    const check_email = await User.findOne({ email });
    if (check_email) {
        return next({
            statusCode: 409,
            message: 'A user with this email already exists',
        });
    }

    const user = new User({
        first_name: first_name,
        midde_name: midde_name,
        last_name: last_name,
        category: category,
        divyang: divyang,
        mobile_number: mobile_number,
        email: email,
        date_of_birth: date_of_birth,
        gender: gender,
        blood_group: blood_group,
        father_name: father_name,
        color_blindness: color_blindness,
        password: hashSync(password, 12),
        createdAt: createdAt,
    });

    const accessToken = generateToken(user);

    const savedUser = await user.save();

    res.cookie('jwt', accessToken, {
        httpOnly: true,
        sameSite: 'None',
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({
        success: true,
        message: 'User created successfully',
        user: {
            user_id: savedUser._id,
        },
        accessToken: accessToken,
    });
};

module.exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    if (!user || !compareSync(password, user.password)) {
        return next({
            statusCode: 401,
            message: 'Invalid username or password',
        });
    }

    const accessToken = generateToken(user);

    res.cookie('jwt', accessToken, {
        httpOnly: true,
        sameSite: 'None',
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({
        success: true,
        message: 'Logged in successfully',
        user: {
            user_id: user._id,
        },
        accessToken: accessToken,
    });
};

module.exports.verify = (req, res) => {
    res.json({
        success: true,
        message: 'User verified successfully',
        user: {
            user_id: req.user._id,
        },
    });
};

module.exports.logout = async (req, res, next) => {
    const cookies = req.cookies;
    const err = {
        statusCode: 204,
    };
    if (!cookies?.jwt) return next(err);

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    res.json({
        success: true,
        message: 'Logged out successfully',
    });
};

// module.exports.changePassword = async (req, res) => {
//     const { password } = req.body;
//     const user = await User.findById(req.user._id);
//     user.password = hashSync(password, 12);
//     await user.save();

//     res.json({
//         success: true,
//         message: 'Password changed successfully',
//         user: {
//             user_id: req.user._id,
//             username: req.user.username,
//         },
//     });
// };

// module.exports.deleteUser = async (req, res) => {
//     const cookies = req.cookies;
//     const user = await User.findById(req.user._id);
//     const tourspots = await Tourspot.find({
//         author: {
//             $eq: user._id,
//         },
//     });

//     for (let tourspot of tourspots) {
//         for (let image of tourspot.images) {
//             await cloudinary.uploader.destroy(image.filename);
//         }
//     }

//     await User.findByIdAndDelete(req.user._id);
//     if (cookies?.jwt)
//         res.clearCookie('jwt', {
//             httpOnly: true,
//             sameSite: 'None',
//             secure: true,
//         });
//     res.json({
//         success: true,
//         message: 'User deleted successfully',
//         user: {
//             user_id: req.user._id,
//             username: req.user.username,
//         },
//     });
// };
