import { Context } from "egg";
declare const FileTransport: any;
export declare class CustomTransport extends FileTransport {
    ctx: any;
    constructor(options: any, ctx: Context);
    log(level: any, args: any, meta: any): void;
    /**
     * 自定义消息格式
     * @param { String } level 日志级别
     */
    messageFormat({ level }: any): string;
}
export {};
