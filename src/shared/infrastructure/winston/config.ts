import * as winston from 'winston';

const customLevels = {
	levels: {
		error: 0,
		warn: 1,
		info: 2,
		http: 3
	},
	colors: {
		error: 'red',
		warn: 'yellow',
		info: 'green',
		http: 'blue'
	}
};

winston.addColors(customLevels.colors);

const logger = winston.createLogger({
	levels: customLevels.levels,
	format: winston.format.combine(
		winston.format.colorize(),
		winston.format.prettyPrint(),
		winston.format.timestamp({
			format: 'YYYY-MM-DD HH:mm:ss'
		}),
		winston.format.printf(({ level, message, timestamp }) => {
			// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
			return `${timestamp} [${level}]: ${message}`;
		})
	),

	transports: [new winston.transports.Console()]
});

export default logger;
