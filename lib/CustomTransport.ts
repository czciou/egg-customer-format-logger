'use strict';

import { Context } from "egg";

const moment = require('moment')
const { serviceIPAddress, clientRealReqDomain, loggerDelimiter } = require('./utils')
const util = require('util')
const FileTransport = require('egg-logger').FileTransport;
const file2transport = {};
export class CustomTransport {
  public ctx: any;
  private _super: any;
  constructor(options: any, ctx: Context) {
    // super(options)
    this._super = file2transport[options.file] = file2transport[options.file] || new FileTransport(options);
    this.ctx = ctx; // 得到每次请求的上下文
  }

  log(level: any, args: any, meta: any) {
    // 获取自定义格式消息
    const customMsg = this.messageFormat({ level });

    // Error 消息打印出错误的堆栈 ，字符串直接打印
    if (args[0] instanceof Error) {
      const err = args[0] || {};
      const errorMsg = util.format('%s: %s\n%s\npid: %s\n', err.name, err.message, err.stack, process.pid);
      args[0] = `${customMsg}\r\n${errorMsg}`;
    } else {
      args[0] = util.format(customMsg, args[0])
    }

    // 这个是必须的，否则日志文件不会写入
    this._super.log(level, args, meta)
  }
  shouldLog(level){
    return this._super.shouldLog(level);
  }
  /**
   * 自定义消息格式
   * @param { String } level 日志级别
   */
  messageFormat({ level }: any) {
    const date = moment().format('YYYY-MM-DD HH:mm:ss:SSS');
    const url = this.ctx.request.url || '';
    // 通过 requestId 可以在 elk (日志系统) 分析查询时间，请求响应时间等指标
    // 每个请求下所有的requestId都是一样的，以获得统一解析的日志文件，便于排查问题。
    const traceId = this.ctx.request.get('x-request-id') || 'x-request-id';
    const uid = this.ctx.request.get('uid') || 'uid';
    // const clientIPAddress = clientIPAddress(this.ctx.request);
    const _clientRealReqDomain = clientRealReqDomain(this.ctx) || 'reqDomain';
    const _clientRealIPAddress = this.ctx.request.get('x-real-ip') || this.ctx.ip || 'ip'
    const use = this.ctx.starttime ? Date.now() - this.ctx.starttime : 0;
    const pid = process.pid;

    let logswitch = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    if (this.ctx.app.config.customerLogger.logswitch) {
      let _logswitch = this.ctx.app.config.customerLogger.logswitch
      for (let i = 0; i < _logswitch.length; i++) {
        logswitch[i] = logswitch[i] & _logswitch[i]
      }
    }
    const logArr = new Array(10)
    logswitch[0] && logArr.push(`[ ${level} ]`);  // 日志级别
    logswitch[1] && logArr.push(`[ ${date} ]`);  // 当前日期
    logswitch[2] && logArr.push(`[ ${traceId} ]`);  // 全链路跟踪id
    logswitch[3] && logArr.push(`[ ${uid} ]`);  // 唯一id
    logswitch[4] && logArr.push(`[ ${serviceIPAddress} ]`);  // 当前服务器IP
    logswitch[5] && logArr.push(`[ ${_clientRealReqDomain} ]`);  // 当前客户端真实域名
    logswitch[6] && logArr.push(`[ ${_clientRealIPAddress} ]`);  // 当前客户端真实IP
    logswitch[7] && logArr.push(`[ ${url} ]`);  // 当前请求地址
    logswitch[8] && logArr.push(`[ ${use}ms ]`);  // 执行时长
    logswitch[9] && logArr.push(`[ ${pid} ]`);  // pid

    return logArr.join(loggerDelimiter);
  }
}
