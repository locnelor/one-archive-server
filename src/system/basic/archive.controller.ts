import { Body, Controller, Get, Param, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiOperation, ApiParam, ApiQuery } from "@nestjs/swagger";
import { adminGuard } from "src/guard/rule.guard";
import { User } from "src/guard/user.decorator";
import { Account } from "../tables/entity/account.entity";
import { ArchiveService } from "./services/archive.service";


@Controller("util/archive")
@UseGuards(AuthGuard("jwt"), adminGuard)
export class ArchiveController {
    constructor(
        private readonly archiveService: ArchiveService
    ) { }


    @Get("getMyProjects")
    @ApiOperation({ summary: "获取我的项目" })
    async getMyProjects(
        @User() user: Account
    ) {

    }

    @Get("download/:name")
    @ApiOperation({ summary: "下载项目" })
    async download(
        @User() user: Account
    ) {

    }

    @Get("projectInfo/:pid")
    @ApiOperation({ summary: "获取项目信息" })
    @ApiQuery({
        name: "pid",
        description: "项目id"
    })
    async projectInfo(
        @Param("pid") pid: number
    ) {

    }

    @Post("addProject")
    @ApiOperation({ summary: "添加项目" })
    @UseInterceptors(FileInterceptor("file"))
    async addProject(
        @UploadedFile("file") file
    ) {
        console.log(file);
    }




}