import { Injectable } from "@nestjs/common";
import { Account } from "src/system/tables/entity/account.entity";
import { ProjectService } from "src/system/tables/service/project.service";
import { PathUtilService } from "src/system/util/path.util.service";
// import { Extract } from "unzip";
import { zip } from "compressing"
import { exec } from "child_process"

@Injectable()
export class ArchiveService {
    constructor(
        private readonly pathUtil: PathUtilService,
        private readonly projectService: ProjectService
    ) { }

    private async processExec(...args: string[]) {
        return new Promise((resolve) => {
            exec(`java -jar ${this.pathUtil.jar_path} ${args.join(" ")}`, (err, stdout, stderr) => {
                resolve({
                    err,
                    stderr,
                    stdout
                })
            })
        })
    }
    public add(format: string, num: string, path: string) {
        return this.processExec("add", format, num, path);
    }
    // public rep(format: string, path: string) {
    //     return this.processExec("rep", format, path);
    // }

    public async create(
        account: Account,
        buffer: Buffer,
        format: string,
        day: number
    ) {
        const project = await this.projectService.create(
            account,
            format,
            day
        );
        const path = this.pathUtil.getGroupDir(project.gid);
        await zip.uncompress(buffer, path);
        return project
    }
}