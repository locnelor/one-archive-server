import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, Length } from "class-validator";


export class RegisterDto {
    @Length(1, 10, {
        message: "用户名长度错误。1-10"
    })
    @ApiProperty({
        description: "用户名"
    })
    user_name: string

    @IsEmail()
    @ApiProperty({
        description: "邮箱"
    })
    user_email: string

    @Length(4, 4, {
        message: "请输入4位邮箱验证码"
    })
    @ApiProperty({
        description: "注册验证码"
    })
    email_code: string

    @Length(6, 20, {
        message: "密码长度错误。6-20"
    })
    @ApiProperty({
        description: "密码"
    })
    password: string

    @Length(6, 20, {
        message: "密码长度错误。6-20"
    })
    @ApiProperty({
        description: "确认密码"
    })
    confirmPassword: string
}