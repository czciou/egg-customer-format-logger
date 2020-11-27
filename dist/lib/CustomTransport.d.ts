import { Context } from "egg";
export declare class CustomTransport {
    ctx: any;
    private _super;
    constructor(options: any, ctx: Context);
    log(level: any, args: any, meta: any): void;
    shouldLog(level: any): any;
    /**
     * 自定义消息格式
     * @param { String } level 日志级别
     */
    messageFormat({ level }: any): string;
}
