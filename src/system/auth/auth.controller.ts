import { Body, Controller, Get, Post, Req, Res, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { Request, Response } from "express";
import { User } from "src/guard/user.decorator";
import { CodeError, PasswordError, UserNotFound } from "src/utils/http";
import { Account } from "../tables/entity/account.entity";
import { AccountService } from "../tables/service/account.service";
import { CryptoUtilService } from "../util/crypto.util.service";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import * as svgCaptcha from "svg-captcha"

@Controller("api/auth")
@ApiTags("用户登录")
export class AuthController {
    constructor(
        private readonly authServer: AuthService,
        private readonly cryptoUtil: CryptoUtilService,
        private readonly accountService: AccountService
    ) { }

    @Post("login")
    @ApiOperation({ summary: "登录" })
    async login(
        @Body() body: LoginDto,
        @Req() req: Request,
        @Res() res: Response
    ) {
        console.log(req.session.code, body.code)
        if (body.code.toLowerCase() !== req.session.code?.toLowerCase()) throw CodeError
        const user = await this.accountService.account.findOne({
            user_email: body.account
        })
        if (!user) throw UserNotFound
        if (!this.accountService.equalsPassword(user, body.password)) throw PasswordError
        const { token } = this.authServer.getToken(user)
        res.setHeader("Set-Cookie", `token=${token};Path=/; HttpOnly`)
        res.send()
    }

    @Get("getInfo")
    @UseGuards(AuthGuard("jwt"))
    @ApiOperation({ summary: "自动登录" })
    async getInfo(
        @User() user: Account
    ) {
        delete user.user_password;
        return user;
    }

    @Get("getSrc")
    @ApiOperation({ summary: "获取验证码" })
    async getSrc(
        @Req() req: Request
    ) {
        const codeConfig = {
            size: 4, // 定义生成的验证码的字符数量
            // ignoreChars: '0o1il', // 忽略某些较难分别的相似字符，如 0 和 o
            color: true, // 验证码的字符是否有背景色
            noise: 3, // 图形验证码中的干扰线条数量
            width: 100, // 生成的图片宽度
            height: 32 // 生成的图片高度
        }
        const captcha = svgCaptcha.create(codeConfig);
        req.session.code = captcha.text
        return captcha.data
    }
}