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
