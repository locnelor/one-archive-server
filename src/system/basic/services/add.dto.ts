import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";


export class AddDto {
    @ApiProperty({
        description: "格式化"
    })
    @IsString()
    format: string

    @ApiProperty({
        description: "添加几天"
    })
    @IsString()
    day: number

    @ApiProperty({
        description: "zip文件"
    })
    file: any
}