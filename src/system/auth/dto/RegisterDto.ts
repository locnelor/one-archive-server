import { IsEmail, Length } from "class-validator";


export class RegisterDto {
    @Length(1, 10, {
        message: "用户名长度错误。1-10"
    })
    user_name: string

    @IsEmail()
    user_email: string

    @Length(4, 4, {
        message: "请输入4位邮箱验证码"
    })
    email_code: string

    @Length(6, 20, {
        message: "密码长度错误。6-20"
    })
    password: string

    @Length(6, 20, {
        message: "密码长度错误。6-20"
    })
    confirmPassword: string
}