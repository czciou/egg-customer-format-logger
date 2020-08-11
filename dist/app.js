'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppLogger = void 0;
const CustomTransport_1 = require("./lib/CustomTransport");
const Logger = require('egg-logger').Logger;
const ConsoleTransport = require('egg-logger').ConsoleTransport;
function AppLogger(ctx) {
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
exports.AppLogger = AppLogger;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQTs7O0FBR1osMkRBQXdEO0FBRXhELE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxNQUFNLENBQUE7QUFDM0MsTUFBTSxnQkFBZ0IsR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUMsZ0JBQWdCLENBQUE7QUFFL0QsU0FBZ0IsU0FBUyxDQUFDLEdBQVk7SUFDcEMsTUFBTSxFQUFFLGNBQWMsRUFBRyxFQUFFLElBQUksR0FBRyxrQ0FBa0MsRUFBRSxlQUFlLEdBQUcsTUFBTSxFQUFFLFlBQVksR0FBRyxNQUFNLEVBQUUsRUFBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDO0lBRTFJLE1BQU0sTUFBTSxHQUFHLElBQUksTUFBTSxFQUFFLENBQUE7SUFFM0IsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsSUFBSSxpQ0FBZSxDQUFDO1FBQ3JDLEtBQUssRUFBRSxlQUFlO1FBQ3hCLElBQUk7S0FBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUE7SUFFYixNQUFNLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxJQUFJLGdCQUFnQixDQUFDO1FBQ3pDLEtBQUssRUFBRSxZQUFZO0tBQ3BCLENBQUMsQ0FBQyxDQUFBO0lBRUgsT0FBTyxNQUFNLENBQUE7QUFDZixDQUFDO0FBZEQsOEJBY0MifQ==