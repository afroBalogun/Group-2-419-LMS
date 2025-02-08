const Joi = require('joi');

const userSchema = Joi.object({
//   username: Joi.string()
//     .pattern(/^\d{9}$/)
//     .required()
//     .messages({
//       'string.pattern.base': 'Username must be exactly 9 digits long',
//       'any.required': 'Username is required'
//     }),

    email: Joi.string()
        .email({ tlds: { allow: false } }) // Ensures it's a valid email format
        .pattern(/^[a-zA-Z0-9._%+-]+@live\.unilag\.edu\.ng$/)
        .required()
        .messages({
        'string.pattern.base': 'Email must end with @live.unilag.edu.ng',
        'string.email': 'Invalid email format',
        'any.required': 'Email is required'
    }),

    name: Joi.string()
        .trim()
        .min(1)
        .required()
        .messages({
        'string.empty': 'Name is required',
        'any.required': 'Name is required'
    }),

    password: Joi.string()
        .min(6)
        .required()
        .messages({
        'string.min': 'Password must be at least 6 characters long',
        'any.required': 'Password is required'
    })
});

module.exports = userSchema;
