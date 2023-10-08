
const { rateLimit } = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 25, // Maximum 50 requests per minute
    message: JSON.stringify({ "Alert": 'Too many requests from this IP Address. Please try again after Sometime.' }),
});

module.exports = { limiter }