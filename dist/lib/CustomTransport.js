'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomTransport = void 0;
const moment = require('moment');
const { serviceIPAddress, clientRealIPAddress, clientRealReqDomain, loggerDelimiter } = require('./utils');
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
        const traceId = this.ctx.request.get('traceId') || '';
        // const clientIPAddress = clientIPAddress(this.ctx.request);
        const _clientRealReqDomain = clientRealReqDomain(this.ctx);
        const _clientRealIPAddress = clientRealIPAddress(this.ctx);
        return [
            `[ ${level} ]`,
            `[ ${date} ]`,
            `[ ${traceId} ]`,
            `[ ${serviceIPAddress} ]`,
            // `[ ${clientIPAddress} ]`, // 当前客户端IP
            `[ ${_clientRealReqDomain} ]`,
            `[ ${_clientRealIPAddress} ]`,
            `[ ${url} ]`,
        ].join(loggerDelimiter);
    }
}
exports.CustomTransport = CustomTransport;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ3VzdG9tVHJhbnNwb3J0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL0N1c3RvbVRyYW5zcG9ydC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUM7OztBQUliLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQTtBQUNoQyxNQUFNLEVBQUUsZ0JBQWdCLEVBQUUsbUJBQW1CLEVBQUUsbUJBQW1CLEVBQUUsZUFBZSxFQUFFLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFBO0FBQzFHLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQTtBQUM1QixNQUFNLGFBQWEsR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUMsYUFBYSxDQUFDO0FBRTFELE1BQWEsZUFBZ0IsU0FBUSxhQUFhO0lBR2hELFlBQVksT0FBWSxFQUFFLEdBQVk7UUFDcEMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBRWQsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxhQUFhO0lBQy9CLENBQUM7SUFFRCxHQUFHLENBQUMsS0FBVSxFQUFFLElBQVMsRUFBRSxJQUFTO1FBQ2xDLFlBQVk7UUFDWixNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztRQUVoRCw0QkFBNEI7UUFDNUIsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLFlBQVksS0FBSyxFQUFFO1lBQzVCLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDMUIsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyx1QkFBdUIsRUFBRSxHQUFHLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDckcsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsU0FBUyxPQUFPLFFBQVEsRUFBRSxDQUFDO1NBQ3pDO2FBQU07WUFDTCxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7U0FDMUM7UUFFRCxvQkFBb0I7UUFDcEIsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFBO0lBQzlCLENBQUM7SUFFRDs7O09BR0c7SUFDSCxhQUFhLENBQUMsRUFBRSxLQUFLLEVBQU87UUFDMUIsTUFBTSxJQUFJLEdBQUcsTUFBTSxFQUFFLENBQUMsTUFBTSxDQUFDLHlCQUF5QixDQUFDLENBQUM7UUFDeEQsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQztRQUN2QywrQ0FBK0M7UUFDL0MsOENBQThDO1FBQzlDLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdEQsNkRBQTZEO1FBQzdELE1BQU0sb0JBQW9CLEdBQUcsbUJBQW1CLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzNELE1BQU0sb0JBQW9CLEdBQUcsbUJBQW1CLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRTNELE9BQU87WUFDTCxLQUFLLEtBQUssSUFBSTtZQUNkLEtBQUssSUFBSSxJQUFJO1lBQ2IsS0FBSyxPQUFPLElBQUk7WUFDaEIsS0FBSyxnQkFBZ0IsSUFBSTtZQUN6Qix1Q0FBdUM7WUFDdkMsS0FBSyxvQkFBb0IsSUFBSTtZQUM3QixLQUFLLG9CQUFvQixJQUFJO1lBQzdCLEtBQUssR0FBRyxJQUFJO1NBQ2IsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDMUIsQ0FBQztDQUNGO0FBbkRELDBDQW1EQyJ9