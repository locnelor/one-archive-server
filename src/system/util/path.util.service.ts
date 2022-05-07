import { Injectable } from "@nestjs/common";
import { join } from "path"
import { existsSync, mkdirSync, statSync, readdirSync, unlinkSync } from "fs"
@Injectable()
export class PathUtilService {
    public mkdirPath(path: string) {
        //创建目录
        const tmp = join(path, "..");
        if (!existsSync(tmp)) {
            this.mkdirPath(tmp);
        }
        if (!existsSync(path)) mkdirSync(path);
        return path;
    }
    public unlinkDir(path: string) {
        //删除目录
        const stat = statSync(path);
        if (!stat.isDirectory()) {
            return;
        }
        const list = readdirSync(path);
        list.forEach(name => {
            const target = join(path, name);
            const targetStat = statSync(target);
            if (targetStat.isFile) {
                unlinkSync(target);
            } else {
                this.unlinkDir(target);
            }
        })
        unlinkSync(path);
    }
    //主目录
    private readonly root_path = join(process.cwd(), "public");
}