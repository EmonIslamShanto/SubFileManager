import winston from 'winston';

// Create a winston logger instance
const logger = winston.createLogger({
  level: 'info',  // You can change this to 'debug' for more detailed logs
  format: winston.format.combine(
    winston.format.colorize(),   // Add color to the logs in the console
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(
      ({ timestamp, level, message }) => `${timestamp} [${level}]: ${message}`
    )
  ),
  transports: [
    new winston.transports.Console(),  // Output logs to the console
    // Add a file transport if needed for persistent logs
    // new winston.transports.File({ filename: 'combined.log' })
  ]
});

// Export logger to use in other files
export default logger;
