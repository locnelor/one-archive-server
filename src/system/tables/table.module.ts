import { Global, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Account } from "./entity/account.entity";
import { Group } from "./entity/group.entity";
import { AccountService } from "./service/account.service";
import { GroupService } from "./service/group.service";

const providers = [AccountService, GroupService]
@Global()
@Module({
    imports: [TypeOrmModule.forFeature([
        Account,
        Group
    ])],
    providers,
    exports: providers
})
export class TableModule { }