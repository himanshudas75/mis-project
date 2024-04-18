const {
    registerSchema,
    complaintSchema,
    eventDateSchema,
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
    if (req.user.roles.includes('admin')) {
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
    console.log(combined_req);
    const { error } = complaintSchema.validate(combined_req);
    console.log(error);

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
