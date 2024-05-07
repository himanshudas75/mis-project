const BaseJoi = require('joi');
const sanitizeHtml = require('sanitize-html');

const extension = (joi) => ({
    type: 'string',
    base: joi.string(),
    messages: {
        'string.escapeHTML': '{{#label}} must not inclue HTML!',
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                const clean = sanitizeHtml(value, {
                    allowedTags: [],
                    allowedAttributes: {},
                });
                if (clean !== value)
                    return helpers.error('string.escapeHTML', { value });
                return clean;
            },
        },
    },
});

const Joi = BaseJoi.extend(extension);

module.exports.registerSchema = Joi.object({
    firstname: Joi.string().required().escapeHTML(),
    middlename: Joi.string().escapeHTML(),
    lastname: Joi.string().escapeHTML(),
    category: Joi.string()
        .required()
        .valid('General', 'OBC(NCL)', 'EWS', 'SC', 'ST'),
    divyang: Joi.boolean().required(),
    mobilenumber: Joi.string()
        .required()
        .escapeHTML()
        .pattern(/^(\d{10})$/),
    email: Joi.string().email().required().escapeHTML(),
    dob: Joi.date().required(),
    mathorstatdegree: Joi.boolean().required(),
    btechdegree: Joi.boolean().required(),
});

module.exports.complaintSchema = Joi.object({
    order_no: Joi.string().required().escapeHTML(),
    contact_no: Joi.string()
        .required()
        .escapeHTML()
        .pattern(/^(\d{10})$/),
    registered_email_id: Joi.string().email().required().escapeHTML(),
    complaint_type: Joi.string().required(),
    complaint_details: Joi.string().required().escapeHTML(),
    payment_type: Joi.string().required(),
    screenshot: Joi.object(),
    // payment_screenshot: Joi.object().required(),
});

module.exports.eventDateSchema = Joi.object({
    event_name: Joi.string().required().escapeHTML(),
    date: Joi.string().escapeHTML(),
});

module.exports.courseSchema = Joi.array()
    .items(
        Joi.object({
            course: Joi.string().required().escapeHTML(),
            programme: Joi.string().required().escapeHTML(),
            department: Joi.string().required().escapeHTML(),
        }).required()
    )
    .max(2);
