import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PathUtilService } from "src/system/util/path.util.service";
import { Repository } from "typeorm";
import { Account } from "../entity/account.entity";
import { Group } from "../entity/group.entity";


@Injectable()
export class GroupService {
    constructor(
        @InjectRepository(Group)
        public readonly group: Repository<Group>,
        private readonly pathUtil: PathUtilService
    ) { }

    public async create(
        account: Account,
        name: string,
        format: string,
        info?: string
    ) {
        const entity = this.group.create({
            name,
            format,
            info
        })
        entity.account = account;
        return await this.group.save(entity)
    }
}