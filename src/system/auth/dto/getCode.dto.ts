import { ApiProperty } from "@nestjs/swagger"
import { Length } from "class-validator"

export class GetCode {
    @ApiProperty({
        description: "邮箱"
    })
    email: string

    @Length(4, 4, {
        message: "请输入4位验证码"
    })
    @ApiProperty({
        description: "发送注册验证码时的验证码（笑）"
    })
    code: string
}