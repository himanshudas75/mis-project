const {
    registerSchema,
    complaintSchema,
    eventDateSchema,
    courseSchema,
} = require('./schemas');
const ExpressError = require('./utils/ExpressError');
const passport = require('passport');

module.exports.isAuthenticated = (req, res, next) => {
    passport.authenticate('access', { session: false }, (err, payload) => {
        if (err || !payload) {
            const error = {
                statusCode: 401,
                message: 'Unauthorized',
            };
            return next(error);
        }

        req.user = payload;
        next();
    })(req, res, next);
};

module.exports.isAdmin = (req, res, next) => {
    if (req.user.roles.includes(process.env.ROLE_ADMIN)) {
        next();
    } else {
        return next({
            statusCode: 401,
            message: 'Unauthorized',
        });
    }
};

module.exports.hasRoles = (req, res, next) => {
    const rolesToCheck = [process.env.ROLE_ADMIN, process.env.ROLE_VERIFIED];

    if (req.user.roles.some((role) => rolesToCheck.includes(role))) {
        next();
    } else {
        return next({
            statusCode: 401,
            message: 'Unauthorized',
        });
    }
};

module.exports.validateUser = (req, res, next) => {
    const { error } = registerSchema.validate(req.body);
    if (error) {
        const msg = error.details.map((el) => el.message).join(',');
        throw new ExpressError(400, msg);
    } else {
        next();
    }
};

module.exports.validateComplaint = (req, res, next) => {
    const combined_req = { ...req.body, screenshot: req.file };
    const { error } = complaintSchema.validate(combined_req);

    if (error) {
        const msg = error.details.map((el) => el.message).join(',');
        throw new ExpressError(400, msg);
    } else {
        next();
    }
};

module.exports.validateEventDate = (req, res, next) => {
    const { error } = eventDateSchema.validate(req.body);
    if (error) {
        const msg = error.details.map((el) => el.message).join(',');
        throw new ExpressError(400, msg);
    } else {
        next();
    }
};

module.exports.validateCourse = (req, res, next) => {
    const { error } = courseSchema.validate(req.body);
    if (error) {
        const msg = error.details.map((el) => el.message).join(',');
        throw new ExpressError(400, msg);
    } else {
        next();
    }
};
