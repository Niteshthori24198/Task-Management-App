
const fs = require('fs');
const path = require('path');


const logFilePath = path.join(__dirname, '../logs/apilogs.txt');

/**
 * This function takes request, response and next as parameters and logs the request and response to a file.
 * @param {*} req request object of expressjs
 * @param {*} res response object of expressjs
 * @param {*} next next function of expressjs for further action in middleware chaining
 */


function logger(req, res, next) {
    try {

        const timestamp = new Date().toISOString();
        const { statusCode } = res;
        const contentLength = res.headersSent ? res.getHeaders()['content-length'] || 0 : 0;

        const logMessage = `${timestamp} -url ${req.method} ${req.url} - Status: ${statusCode}, Content Length: ${contentLength} bytes\n`;

        console.log(logMessage);

        fs.writeFileSync(logFilePath, logMessage, { flag: 'a' });
    } catch (err) {
        console.error('Error writing to log file:', err);
    }

    next();
}


module.exports = { logger };