const winston = require('winston')
const config = require('../config/config')
const env = config.env

const logger = winston.createLogger({
    level: env === 'development' ? 'debug' : 'info',
    format: winston.format.combine(
        env == 'development' ? winston.format.colorize() : winston.format.uncolorize(),
        winston.format.splat(),
        winston.format.printf(({level, message}) => `${level}: ${message}`)
    ),
    transports: [
        new winston.transports.Console({
            level: 'debug',
            handleExceptions: true,
            json: false,
            colorize: true,
        })
    ]
})

// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
    write: function (message, encoding) {
        logger.info(message)
    }
}

module.exports = logger