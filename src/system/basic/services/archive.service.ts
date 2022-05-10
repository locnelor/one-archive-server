import { Injectable } from "@nestjs/common";
import { Account } from "src/system/tables/entity/account.entity";
import { GroupService } from "src/system/tables/service/group.service";
import { PathUtilService } from "src/system/util/path.util.service";
// import { Extract } from "unzip";
import { zip } from "compressing"
import { exec } from "child_process"

@Injectable()
export class ArchiveService {
    constructor(
        private readonly pathUtil: PathUtilService,
        private readonly GroupService: GroupService
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
    public add(format: string, num: number, path: string) {
        return this.processExec("add", format, num + "", path);
    }
    private rep(format: string, path: string) {
        return this.processExec("rep", format, path);
    }

    public async create(
        account: Account,
        buffer: Buffer,
        name: string,
        info: string,
        format: string
    ) {
        const group = await this.GroupService.create(
            account,
            name,
            format,
            info
        );
        const path = this.pathUtil.getGroupDir(group.gid);
        await zip.uncompress(buffer, path)
        //执行java程序
        return await this.rep(format, path)
    }
}