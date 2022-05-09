import { HttpCode, HttpException } from "@nestjs/common";
class Http extends HttpException {
    constructor(msg: string, code: number) {
        super(msg, code)
    }
    static forbidden = (msg: string, code = 403) => new Http(msg, code)
}
export const NotFound = Http.forbidden("404", 404)
export const RejectCode = Http.forbidden("拒绝访问")

export const CodeError = Http.forbidden("验证码错误", 403)

export const UserNotFound = Http.forbidden("找不到用户", 404)

export const PasswordError = Http.forbidden("密码错误", 403)

export const EmailExists = Http.forbidden("邮箱已被注册");


export const forBiddenException = (msg: string) => Http.forbidden(msg);
export const NotFoundException = (msg: string) => Http.forbidden(msg);