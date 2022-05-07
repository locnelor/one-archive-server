import { ApiProperty } from "@nestjs/swagger";
import { Length } from "class-validator";

export class LoginDto {
    @Length(6, 30, {
        message: "账号应为6-30个字符"
    })
    @ApiProperty({
        description: "账号"
    })
    account: string

    @Length(6, 30, {
        message: "请输入至少6位密码"
    })
    @ApiProperty({
        description: "密码"
    })
    password: string

    @Length(4, 4, {
        message: "请输入4位验证码"
    })
    @ApiProperty({
        description: "验证码"
    })
    code: string
}