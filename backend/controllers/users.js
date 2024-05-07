const User = require('../models/user');
const { hashSync, compareSync } = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { transporter, registerBody } = require('../utils/nodemailer');

const generateToken = (token_type, registration_number, roles) => {
    var payload = '';

    if (token_type === 'access') {
        payload = {
            identity: registration_number,
            roles: roles,
        };

        secret = process.env.ACCESS_TOKEN_SECRET;
    } else if (token_type === 'email') {
        payload = {
            identity: registration_number,
        };

        secret = process.env.EMAIL_TOKEN_SECRET;
    }

    const options = {
        expiresIn: '1d',
    };

    const token = jwt.sign(payload, secret, options);
    return token;
};

const generateRegistrationNumber = () => {
    return crypto.randomBytes(8).toString('hex');
};

const generatePassword = () => {
    return crypto.randomBytes(8).toString('hex');
};

module.exports.getDetails = async (req, res, next) => {
    const user = await User.findOne({ registration_number: req.user.identity });
    res.json({
        success: true,
        message: 'User fetched successfully',
        user: user,
    });
};

module.exports.register = async (req, res, next) => {
    const {
        firstname,
        middlename,
        lastname,
        category,
        divyang,
        mobilenumber,
        email,
        dob,
        mathorstatdegree,
        btechdegree,
    } = req.body;

    console.log('HERE');

    const check_email = await User.findOne({ email });
    if (check_email) {
        return next({
            statusCode: 409,
            message: 'A user with this email already exists',
        });
    }

    const registration_number = generateRegistrationNumber();
    const password = generatePassword();
    const roles = [process.env.ROLE_UNVERIFIED];

    const user = new User({
        first_name: firstname,
        middle_name: middlename,
        last_name: lastname,
        category: category,
        divyang: divyang,
        mobile_number: mobilenumber,
        email: email,
        date_of_birth: dob,
        math_or_stat_degree: mathorstatdegree,
        btech_degree: btechdegree,
        registration_number: registration_number,
        password: hashSync(password, 12),
        roles: roles,
    });

    const accessToken = generateToken('access', registration_number, roles);
    const emailToken = generateToken('email', registration_number);

    const verify_url = `${process.env.API_VERIFY_USER}?token=${emailToken}`;

    const savedUser = await user.save();

    res.cookie(process.env.AUTHENTICATION_COOKIE_NAME, accessToken, {
        // httpOnly: true,
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
                .replace('PASS_PLACEHOLDER', password)
                .replace('VERIFY_URL_PLACEHOLDER', verify_url),
        })
        .then((info) => {
            console.log({ info });
        })
        .catch(console.error);

    res.json({
        success: true,
        message: 'User created successfully',
        user: {
            identity: registration_number,
            roles: roles,
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

    const roles = user.roles;

    const accessToken = generateToken('access', registration_number, roles);

    res.cookie(process.env.AUTHENTICATION_COOKIE_NAME, accessToken, {
        // httpOnly: true,
        sameSite: 'None',
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({
        success: true,
        message: 'Logged in successfully',
        user: {
            identity: registration_number,
            roles: roles,
        },
        accessToken: accessToken,
    });
};

module.exports.verify = async (req, res, next) => {
    const email_token = req.query?.token;
    var payload = '';

    const err = {
        statusCode: 400,
        message: 'Invalid token',
    };

    try {
        payload = jwt.verify(email_token, process.env.EMAIL_TOKEN_SECRET);
    } catch (e) {
        return next(err);
    }

    const registration_number = payload?.identity;
    const user = await User.findOne({ registration_number });

    if (!user) {
        return next(err);
    }

    if (user.roles.includes(process.env.ROLE_VERIFIED)) {
        res.json({
            success: true,
            message: 'User already verified',
            user: {
                registration_number,
            },
        });
    } else {
        const roles = user.roles
            .filter((item) => item !== process.env.ROLE_UNVERIFIED)
            .concat(process.env.ROLE_VERIFIED);

        user.roles = roles;

        const savedUser = await user.save();

        res.clearCookie(process.env.AUTHENTICATION_COOKIE_NAME, {
            // httpOnly: true,
            sameSite: 'None',
            secure: true,
        });

        res.json({
            success: true,
            message: 'User verified successfully',
            user: {
                registration_number,
            },
        });
    }
};

module.exports.isLoggedIn = (req, res) => {
    res.json({
        success: true,
        message: 'User is logged in',
        user: req.user,
    });
};

module.exports.hasRoles = (req, res) => {
    res.json({
        success: true,
        message: 'User has the required roles',
        user: req.user,
    });
};

module.exports.logout = async (req, res, next) => {
    const cookies = req.cookies;
    const err = {
        statusCode: 204,
    };

    if (!cookies || !cookies[process.env.AUTHENTICATION_COOKIE_NAME])
        return next(err);

    res.clearCookie(process.env.AUTHENTICATION_COOKIE_NAME, {
        // httpOnly: true,
        sameSite: 'None',
        secure: true,
    });

    res.json({
        success: true,
        message: 'Logged out successfully',
    });
};

module.exports.changePassword = async (req, res) => {
    const { password } = req.body;
    const registration_number = req.user.identity;
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

    const registration_number = req.user.identity;

    const user = await User.findOne({ registration_number });

    await User.findOneAndDelete(registration_number);

    if (!cookies || !cookies[process.env.AUTHENTICATION_COOKIE_NAME]) {
        res.clearCookie(process.env.AUTHENTICATION_COOKIE_NAME, {
            // httpOnly: true,
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
