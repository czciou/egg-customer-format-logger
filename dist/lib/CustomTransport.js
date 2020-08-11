'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomTransport = void 0;
const moment = require('moment');
const { serviceIPAddress, clientRealReqDomain, loggerDelimiter } = require('./utils');
const util = require('util');
const FileTransport = require('egg-logger').FileTransport;
class CustomTransport extends FileTransport {
    constructor(options, ctx) {
        super(options);
        this.ctx = ctx; // 得到每次请求的上下文
    }
    log(level, args, meta) {
        // 获取自定义格式消息
        const customMsg = this.messageFormat({ level });
        // Error 消息打印出错误的堆栈 ，字符串直接打印
        if (args[0] instanceof Error) {
            const err = args[0] || {};
            const errorMsg = util.format('%s: %s\n%s\npid: %s\n', err.name, err.message, err.stack, process.pid);
            args[0] = `${customMsg}\r\n${errorMsg}`;
        }
        else {
            args[0] = util.format(customMsg, args[0]);
        }
        // 这个是必须的，否则日志文件不会写入
        super.log(level, args, meta);
    }
    /**
     * 自定义消息格式
     * @param { String } level 日志级别
     */
    messageFormat({ level }) {
        const date = moment().format('YYYY-MM-DD HH:mm:ss:SSS');
        const url = this.ctx.request.url || '';
        // 通过 requestId 可以在 elk (日志系统) 分析查询时间，请求响应时间等指标
        // 每个请求下所有的requestId都是一样的，以获得统一解析的日志文件，便于排查问题。
        const traceId = this.ctx.request.get('x-request-id') || 'x-request-id';
        const uid = this.ctx.request.get('uid') || 'uid';
        // const clientIPAddress = clientIPAddress(this.ctx.request);
        const _clientRealReqDomain = clientRealReqDomain(this.ctx) || 'reqDomain';
        const _clientRealIPAddress = this.ctx.request.get('x-real-ip') || this.ctx.ip || 'ip';
        const use = this.ctx.starttime ? Date.now() - this.ctx.starttime : 0;
        return [
            `[ ${level} ]`,
            `[ ${date} ]`,
            `[ ${traceId} ]`,
            `[ ${uid} ]`,
            `[ ${serviceIPAddress} ]`,
            // `[ ${clientIPAddress} ]`, // 当前客户端IP
            `[ ${_clientRealReqDomain} ]`,
            `[ ${_clientRealIPAddress} ]`,
            `[ ${url} ]`,
            `[ ${use}ms ]`,
        ].join(loggerDelimiter);
    }
}
exports.CustomTransport = CustomTransport;
