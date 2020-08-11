import { Context } from "egg";
/**
 * 日志分隔符
 */
export declare const loggerDelimiter = "";
/**
 * 获取当前服务器IP
 */
export declare const serviceIPAddress: any;
/**
 * 获取当前请求客户端IP
 * 不安全的写法
 * @param { Object } req 请求
 */
export declare function clientIPAddress(req: any): any;
/**
 * 需要对用户的 IP 做限流、防刷限制时，获取真实的IP
 * @param { Object } ctx 请求上下文
 */
export declare function clientRealIPAddress(ctx: Context): string;
/**
 * 需要对用户的 IP 做限流、防刷限制时，获取真实的请求域名
 * @param { Object } ctx 请求上下文
 */
export declare function clientRealReqDomain(ctx: Context): string;
