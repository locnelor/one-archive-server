import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CryptoUtilService } from "src/system/util/crypto.util.service";
import { Repository } from "typeorm";
import { Account } from "../entity/account.entity";
import { Project } from "../entity/project.entity";


@Injectable()
export class ProjectService {
    constructor(
        @InjectRepository(Project)
        public readonly project: Repository<Project>,
        private readonly cryptoUtil: CryptoUtilService
    ) { }

    public async create(
        account: Account,
        format: string,
        day
    ) {
        const gid = this.cryptoUtil.createUid(account.uid);

        const entity = this.project.create({
            format,
            day,
            gid
        })
        entity.account = account;
        return await this.project.save(entity)
    }
}