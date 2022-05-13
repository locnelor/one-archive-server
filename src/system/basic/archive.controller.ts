import { Body, Controller, Get, Param, Post, Res, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiOperation, ApiParam, ApiQuery } from "@nestjs/swagger";
import { allUserGuard } from "src/guard/rule.guard";
import { User } from "src/guard/user.decorator";
import { NotFound, RejectCode } from "src/utils/http";
import { Account } from "../tables/entity/account.entity";
import { AccountService } from "../tables/service/account.service";
import { ProjectService } from "../tables/service/project.service";
import { PathUtilService } from "../util/path.util.service";
import { ArchiveService } from "./services/archive.service";
import { zip } from "compressing";
import { Response } from "express";
import { AddDto } from "./services/add.dto";

@Controller("api/archive")
@UseGuards(AuthGuard("jwt"), allUserGuard)
export class ArchiveController {
    constructor(
        private readonly archiveService: ArchiveService,
        private readonly accountService: AccountService,
        private readonly pathUtil: PathUtilService,
        private readonly projectService: ProjectService
    ) { }


    @Get("getMyProjects")
    @ApiOperation({ summary: "获取我的项目" })
    async getMyProjects(
        @User() user: Account
    ) {
        const result = await this.accountService.account.findOne(user.uid, {
            relations: ["groups"]
        })
        return result.groups;
    }

    @Get("download/:gid/:name")
    @ApiOperation({ summary: "下载项目" })
    @ApiQuery({
        name: "gid",
        description: "项目id"
    })
    @ApiQuery({
        name: "name",
        description: "下载时的项目名称，可自定义。推荐为：[date].zip"
    })
    async download(
        @User() user: Account,
        @Param("gid") gid: number,
        @Res() res: Response
    ) {
        const result = await this.projectService.project.findOne(gid, {
            relations: ["account"]
        });
        if (result.account.uid !== user.uid) throw RejectCode;
        const stream = new zip.Stream();
        stream.addEntry(this.pathUtil.getGroupDir(gid))
        stream.pipe(res);
    }

    @Post("add")
    @ApiOperation({ summary: "添加项目" })
    @UseInterceptors(FileInterceptor("file"))
    async get(
        @UploadedFile("file") file,
        @Body() { format, day }: AddDto,
        @User() user: Account
    ) {
        const buffer = file.buffer;
        const name = file.originalname;
        const suffix = name.substring(name.lastIndexOf(".") + 1);
        if (suffix !== "zip") throw RejectCode
        return await this.archiveService.create(
            user,
            buffer,
            format,
            day
        );
    }

    @Get("run/:id")
    @ApiParam({
        name: "id",
        description: "项目id"
    })
    @ApiOperation({ summary: "执行项目" })
    async run(
        @Param("id") id: string
    ) {
        const project = await this.projectService.project.findOne(id);
        if (!project) throw NotFound;
        project.status = "running";
        await this.projectService.project.save(project);
        const path = this.pathUtil.getGroupDir(project.gid);
        const result = await this.archiveService
            .add(project.format, project.day, path)
            .then((e) => {
                project.status = "success";
                return e;
            })
            .catch(() => {
                project.status = "error"
            });
        await this.projectService.project.save(project);
        return {
            result,
            project
        };
    }

    // @Get("projectInfo/:gid")
    // @ApiOperation({ summary: "获取项目信息" })
    // @ApiQuery({
    //     name: "gid",
    //     description: "项目id"
    // })
    // async projectInfo(
    //     @Param("gid") gid: number,
    //     @User() user: Account
    // ) {
    //     const result = await this.groupService.group.findOne(gid, {
    //         relations: ["account"]
    //     });
    //     if (result.account.uid !== user.uid) throw RejectCode;
    //     return this.pathUtil.getDirInfo(this.pathUtil.getGroupDir(gid))
    // }

    // @Get("add/:gid/:num")
    // @ApiOperation({ summary: "为项目添加几天日期" })
    // @ApiQuery({
    //     name: "gid",
    //     description: "项目id"
    // })
    // @ApiQuery({
    //     name: "num",
    //     description: "追加天数"
    // })
    // async add(
    //     @User() user: Account,
    //     @Param("gid") gid: number,
    //     @Param("num") num: number
    // ) {
    //     const result = await this.groupService.group.findOne(gid, {
    //         relations: ["account"]
    //     })
    //     if (result.account.uid !== user.uid) throw RejectCode;
    //     const path = this.pathUtil.getGroupDir(gid);
    //     return this.archiveService.add(result.format, num, path);
    // }

    // @Post("addGroup")
    // @ApiOperation({ summary: "创建组" })
    // @UseInterceptors(FileInterceptor("file"))
    // async addGroup(
    //     @UploadedFile("file") file,
    //     @Body() body: AddGroupDto,
    //     @User() user: Account
    // ) {
    //     return await this.archiveService.create(
    //         user,
    //         file.buffer,
    //         body.name,
    //         body.info,
    //         body.format
    //     )
    // }




}