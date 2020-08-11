"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientRealReqDomain = exports.clientRealIPAddress = exports.clientIPAddress = exports.serviceIPAddress = exports.loggerDelimiter = void 0;
const interfaces = require('os').networkInterfaces();
/**
 * 日志分隔符
 */
exports.loggerDelimiter = '';
/**
 * 获取当前服务器IP
 */
exports.serviceIPAddress = (() => {
    for (const devName in interfaces) {
        const iface = interfaces[devName];
        for (let i = 0; i < iface.length; i++) {
            const alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address;
            }
        }
    }
})();
/**
 * 获取当前请求客户端IP
 * 不安全的写法
 * @param { Object } req 请求
 */
function clientIPAddress(req) {
    const address = req.headers['x-forwarded-for'] || // 判断是否有反向代理 IP
        (req.connection && req.connection.remoteAddress) || // 判断 connection 的远程 IP
        (req.socket && req.socket.remoteAddress) || // 判断后端的 socket 的 IP
        (req.connection && req.connection.socket.remoteAddress);
    return address.replace(/::ffff:/ig, '');
}
exports.clientIPAddress = clientIPAddress;
;
/**
 * 需要对用户的 IP 做限流、防刷限制时，获取真实的IP
 * @param { Object } ctx 请求上下文
 */
function clientRealIPAddress(ctx) {
    const { ip, } = ctx;
    return `${ip}`;
}
exports.clientRealIPAddress = clientRealIPAddress;
;
/**
 * 需要对用户的 IP 做限流、防刷限制时，获取真实的请求域名
 * @param { Object } ctx 请求上下文
 */
function clientRealReqDomain(ctx) {
    const { host, // 获取用户请求的域名 
    protocol // 获取用户请求的协议
     } = ctx;
    return `${protocol}://${host}`;
}
exports.clientRealReqDomain = clientRealReqDomain;
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsTUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLGlCQUFpQixFQUFFLENBQUE7QUFFcEQ7O0dBRUc7QUFDVSxRQUFBLGVBQWUsR0FBRyxFQUFFLENBQUM7QUFFbEM7O0dBRUc7QUFDVSxRQUFBLGdCQUFnQixHQUFHLENBQUMsR0FBRyxFQUFFO0lBQ3BDLEtBQUssTUFBTSxPQUFPLElBQUksVUFBVSxFQUFFO1FBQ2hDLE1BQU0sS0FBSyxHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUVqQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNyQyxNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFFdEIsSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLE1BQU0sSUFBSSxLQUFLLENBQUMsT0FBTyxLQUFLLFdBQVcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUU7Z0JBQy9FLE9BQU8sS0FBSyxDQUFDLE9BQU8sQ0FBQTthQUNyQjtTQUNGO0tBQ0Y7QUFDSCxDQUFDLENBQUMsRUFBRSxDQUFDO0FBRUw7Ozs7R0FJRztBQUNILFNBQWdCLGVBQWUsQ0FBQyxHQUFRO0lBQ3RDLE1BQU0sT0FBTyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsSUFBSSxlQUFlO1FBQy9ELENBQUMsR0FBRyxDQUFDLFVBQVUsSUFBSSxHQUFHLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxJQUFJLHVCQUF1QjtRQUMzRSxDQUFDLEdBQUcsQ0FBQyxNQUFNLElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxvQkFBb0I7UUFDaEUsQ0FBQyxHQUFHLENBQUMsVUFBVSxJQUFJLEdBQUcsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFBO0lBRXpELE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDLENBQUE7QUFDekMsQ0FBQztBQVBELDBDQU9DO0FBQUEsQ0FBQztBQUVGOzs7R0FHRztBQUNILFNBQWdCLG1CQUFtQixDQUFDLEdBQVk7SUFDOUMsTUFBTSxFQUNKLEVBQUUsR0FDSCxHQUFHLEdBQUcsQ0FBQztJQUVSLE9BQU8sR0FBRyxFQUFFLEVBQUUsQ0FBQztBQUNqQixDQUFDO0FBTkQsa0RBTUM7QUFBQSxDQUFDO0FBRUY7OztHQUdHO0FBQ0gsU0FBZ0IsbUJBQW1CLENBQUMsR0FBWTtJQUM5QyxNQUFNLEVBQ0osSUFBSSxFQUFDLGFBQWE7SUFDbEIsUUFBUSxDQUFBLFlBQVk7TUFDckIsR0FBRyxHQUFHLENBQUM7SUFDUixPQUFPLEdBQUcsUUFBUSxNQUFNLElBQUksRUFBRSxDQUFDO0FBQ2pDLENBQUM7QUFORCxrREFNQztBQUFBLENBQUMifQ==