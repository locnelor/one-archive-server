import { Injectable } from "@nestjs/common";
import { join, basename } from "path"
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
    //获取目录信息
    public getDirInfo(path: string) {
        const stat = statSync(path);
        if (stat.isFile()) return {
            size: stat.size,
            name: basename(path)
        }
        if (stat.isDirectory()) {
            return readdirSync(path).map(name => this.getDirInfo(join(path, name)));
        }
    }
    //主目录
    private readonly root_path = join(process.cwd(), "public");

    //获取组文件目录
    public getGroupDir(gid: number) {
        return join(this.root_path, "groups", gid + "");
    }
    public readonly jar_path = join(process.cwd(), "java", "out", "artifacts", "program_jar", "program.jar")

}