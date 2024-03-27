const User = require('../models/user');
const { hashSync, compareSync } = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { transporter, registerBody } = require('../utils/nodemailer');

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

const generateRegistrationNumber = () => {
    return crypto.randomBytes(8).toString('hex');
};

const generatePassword = () => {
    return crypto.randomBytes(8).toString('hex');
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
    } = req.body;

    const check_email = await User.findOne({ email });
    if (check_email) {
        return next({
            statusCode: 409,
            message: 'A user with this email already exists',
        });
    }

    const registration_number = generateRegistrationNumber();
    const password = generatePassword();

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
        registration_number: registration_number,
        password: hashSync(password, 12),
    });

    const accessToken = generateToken(user);

    const savedUser = await user.save();

    res.cookie('jwt', accessToken, {
        httpOnly: true,
        sameSite: 'None',
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
    });

    transporter
        .sendMail({
            from: 'No Reply <noreply@iitism.ac.in',
            to: email,
            subject: 'Registration Success',
            html: registerBody
                .replace('REGNO_PLACEHOLDER', registration_number)
                .replace('PASS_PLACEHOLDER', password),
        })
        .then((info) => {
            console.log({ info });
        })
        .catch(console.error);

    res.json({
        success: true,
        message: 'User created successfully',
        user: {
            registration_number: registration_number,
            password: password,
        },
        accessToken: accessToken,
    });
};

module.exports.login = async (req, res, next) => {
    const { registration_number, password } = req.body;
    const user = await User.findOne({ registration_number });

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
            registration_number,
        },
        accessToken: accessToken,
    });
};

module.exports.verify = (req, res) => {
    res.json({
        success: true,
        message: 'User verified successfully',
        user: {
            registration_number: req.user.registration_number,
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

module.exports.changePassword = async (req, res) => {
    const { password } = req.body;
    const registration_number = req.user.registration_number;
    const user = await User.findOne({ registration_number });
    user.password = hashSync(password, 12);
    await user.save();

    res.json({
        success: true,
        message: 'Password changed successfully',
        user: {
            registration_number,
        },
    });
};

module.exports.deleteUser = async (req, res) => {
    const cookies = req.cookies;

    const registration_number = req.user.registration_number;

    const user = await User.findOne({ registration_number });

    await User.findOneAndDelete(registration_number);

    if (cookies?.jwt) {
        res.clearCookie('jwt', {
            httpOnly: true,
            sameSite: 'None',
            secure: true,
        });
    }
    res.json({
        success: true,
        message: 'User deleted successfully',
        user: {
            registration_number,
        },
    });
};
