import { ApiProperty } from "@nestjs/swagger"
import { IsString, Length } from "class-validator"


export class AddGroupDto {
    @ApiProperty({
        description: ".zpi文件"
    })
    file: any

    @ApiProperty({
        description: "组名称"
    })
    @Length(1, 20)
    name: string


    @ApiProperty({
        description: "组介绍"
    })
    @Length(0, 50)
    info: string

    @ApiProperty({
        description: "格式"
    })
    @IsString()
    format: string
}