import winston from 'winston'

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.Console()
    ],
})

const loggingMiddleware = (req , res , next) =>{
    logger.info(`Incoming request: ${req.method} ${req.url}`)
    next();
}

export default loggingMiddleware;