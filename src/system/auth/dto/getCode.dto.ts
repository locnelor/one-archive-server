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
        description: "验证码"
    })
    code: string
}