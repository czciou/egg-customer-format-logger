'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomLogger = void 0;
const CustomTransport_1 = require("./CustomTransport");
const Logger = require('egg-logger').Logger;
const ConsoleTransport = require('egg-logger').ConsoleTransport;
function CustomLogger(ctx) {
    const { customerLogger: { file = '/var/log/egg-server-ssr/test.log', fileLoggerLevel = 'INFO', consoleLevel = 'INFO' } } = ctx.app.config;
    const logger = new Logger();
    logger.set('file', new CustomTransport_1.CustomTransport({
        level: fileLoggerLevel,
        file
    }, ctx));
    logger.set('console', new ConsoleTransport({
        level: consoleLevel
    }));
    return logger;
}
exports.CustomLogger = CustomLogger;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ3VzdG9tTG9nZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL0N1c3RvbUxvZ2dlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUE7OztBQUdaLHVEQUFvRDtBQUVwRCxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUMsTUFBTSxDQUFBO0FBQzNDLE1BQU0sZ0JBQWdCLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLGdCQUFnQixDQUFBO0FBRS9ELFNBQWdCLFlBQVksQ0FBQyxHQUFZO0lBQ3ZDLE1BQU0sRUFBRSxjQUFjLEVBQUcsRUFBRSxJQUFJLEdBQUcsa0NBQWtDLEVBQUUsZUFBZSxHQUFHLE1BQU0sRUFBRSxZQUFZLEdBQUcsTUFBTSxFQUFFLEVBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQztJQUUxSSxNQUFNLE1BQU0sR0FBRyxJQUFJLE1BQU0sRUFBRSxDQUFBO0lBRTNCLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLElBQUksaUNBQWUsQ0FBQztRQUNyQyxLQUFLLEVBQUUsZUFBZTtRQUN4QixJQUFJO0tBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFBO0lBRWIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsSUFBSSxnQkFBZ0IsQ0FBQztRQUN6QyxLQUFLLEVBQUUsWUFBWTtLQUNwQixDQUFDLENBQUMsQ0FBQTtJQUVILE9BQU8sTUFBTSxDQUFBO0FBQ2YsQ0FBQztBQWRELG9DQWNDIn0=