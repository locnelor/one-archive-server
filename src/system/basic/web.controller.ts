import { Controller, Get } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
// import { ProjectService } from "../tables/service/project.service";


@Controller("web")
@ApiTags("网站基本接口")
export class WebController {
    constructor(
        // private readonly projectService: ProjectService
    ) { }

    // @Get("allProject")
    // @ApiOperation({ summary: "获取所有项目" })
    // public async allProject() {
    //     return await this.projectService.project.find({
    //         order: {
    //             pid: "DESC"
    //         }
    //     })
    // }
}