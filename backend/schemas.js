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
    first_name: Joi.string().required().escapeHTML(),
    middle_name: Joi.string().escapeHTML(),
    last_name: Joi.string().escapeHTML(),
    category: Joi.string()
        .required()
        .valid('General', 'OBC(NCL)', 'EWS', 'SC', 'ST'),
    divyang: Joi.boolean().required(),
    mobile_number: Joi.string()
        .required()
        .escapeHTML()
        .pattern(/^(\+)([1-9]{2})(\d{10})$/),
    email: Joi.string().email().required().escapeHTML(),
    date_of_birth: Joi.date().required(),
    gender: Joi.string().required().valid('M', 'F', 'T'),
    blood_group: Joi.string()
        .required()
        .valid('A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'),
    father_name: Joi.string().escapeHTML(),
    color_blindness: Joi.boolean().required(),
});

module.exports.complaintSchema = Joi.object({
    order_number: Joi.string().required().escapeHTML(),
    registered_mobile_number: Joi.string()
        .required()
        .escapeHTML()
        .pattern(/^(\+)([1-9]{2})(\d{10})$/),
    registered_email: Joi.string().email().required().escapeHTML(),
    complaint_type: Joi.string().required().valid('Civil', 'Electric'),
    complaint_details: Joi.string().required().escapeHTML(),
    payment_type: Joi.string().required().valid('PayTM', 'GPay'),
});
