import { Length } from "class-validator";

export class LoginDto {
    @Length(11, 11)
    phone: string

    @Length(6, 30, {
        message: "请输入至少6位密码"
    })
    password: string
}