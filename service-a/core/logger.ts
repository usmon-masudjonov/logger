import winston from "winston";

function createLogger(opts: any) {
  const {
    level = "info",
    getCorrelationId,
    noCorrelationIdValue = "nocorrelation",
  } = opts;

  return winston.createLogger({
    format: winston.format.combine(
      winston.format((info) => {
        info.correlationId = getCorrelationId() || noCorrelationIdValue;
        return info;
      })(),
      winston.format.timestamp(),
      winston.format.errors({ stack: true }),
      winston.format.colorize(),
      winston.format.printf(({ timestamp, correlationId, level, message }) => {
        return `${timestamp} (${correlationId}) - ${level}: ${message}`;
      }),
      winston.format.json({
        space: 4,
      })
    ),
    level,
    transports: [
      new winston.transports.Console({
        handleExceptions: true,
      }),
      new winston.transports.File({
        filename: "logs/application.log",
      }),
    ],
    exitOnError: false,
  });
}

export { createLogger };
