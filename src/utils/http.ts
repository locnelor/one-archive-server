import { HttpCode, HttpException } from "@nestjs/common";
class Http extends HttpException {
    constructor(msg: string, code: number) {
        super(msg, code)
    }
    static forbidden = (msg: string, code = 403) => new Http(msg, code)
}
export const NotFound = Http.forbidden("404", 404)
export const RejectCode = Http.forbidden("拒绝访问")