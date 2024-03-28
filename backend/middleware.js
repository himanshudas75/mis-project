const {
    registerSchema,
    complaintSchema,
    eventDateSchema,
} = require('./schemas');
const ExpressError = require('./utils/ExpressError');
const passport = require('passport');

module.exports.isAuthenticated = (req, res, next) => {
    passport.authenticate('access', { session: false }, (err, user) => {
        if (err || !user) {
            const error = {
                statusCode: 401,
                message: 'Unauthorized',
            };
            return next(error);
        }

        req.user = user;
        next();
    })(req, res, next);
};

module.exports.isAdmin = (req, res, next) => {
    if (req.user.admin) {
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
    const { error } = complaintSchema.validate(req.body);
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
