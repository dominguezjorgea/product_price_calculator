const winston = require('winston');

// Define log format
const logFormat = winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
    winston.format.printf(({ timestamp, level, message, ...meta }) => {
        return JSON.stringify({
            timestamp,
            level,
            message,
            ...meta
        });
    })
);

// Create logger instance
const logger = winston.createLogger({
    level: 'info',
    format: logFormat,
    transports: [
        // Write all logs to console
        new winston.transports.Console(),
        // Write all logs error (and above) to `error.log`
        new winston.transports.File({ 
            filename: 'logs/error.log', 
            level: 'error' 
        }),
        // Write all logs to `combined.log`
        new winston.transports.File({ 
            filename: 'logs/combined.log' 
        })
    ]
});

module.exports = logger; 