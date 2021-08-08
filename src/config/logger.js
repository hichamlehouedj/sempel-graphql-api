import winston from 'winston';
const { createLogger, format, transports } = winston;
const { combine, timestamp, label, printf } = format;

const logger = createLogger({
    level: 'info',
    format: combine(
        timestamp({format: 'MMM-DD-YYYY HH:mm:ss'}),
        printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`)
    ),
    defaultMeta: { service: 'user-service' },
    transports: [
        // - Write all logs with level `error` and below to `error.log`
        // - Write all logs with level `info` and below to `combined.log`

        // new transports.File({ filename: 'logs/error.log', level: 'error' }),
        new transports.File({ filename: 'logs/combined.log', level: 'info'  }),
        new transports.Console()
    ]
});

export default logger;