
const { rateLimit }  = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 5, // Maximum 50 requests per minute
    message: 'Too many requests from this IP Address., please try again after sometime.',
});

module.exports = { limiter }