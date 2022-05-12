import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PathUtilService } from "src/system/util/path.util.service";
import { Repository } from "typeorm";
import { Account } from "../entity/account.entity";
import { Project } from "../entity/project.entity";


@Injectable()
export class ProjectService {
    constructor(
        @InjectRepository(Project)
        public readonly project: Repository<Project>,
        private readonly pathUtil: PathUtilService
    ) { }

    public async create(
        account: Account,
        format: string,
        day
    ) {
        const entity = this.project.create({
            format,
            day
        })
        entity.account = account;
        return await this.project.save(entity)
    }
}