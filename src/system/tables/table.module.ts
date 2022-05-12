import { Global, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Account } from "./entity/account.entity";
import { Project } from "./entity/project.entity";
import { AccountService } from "./service/account.service";
import { ProjectService } from "./service/project.service";

const providers = [AccountService, ProjectService]
@Global()
@Module({
    imports: [TypeOrmModule.forFeature([
        Account,
        Project
    ])],
    providers,
    exports: providers
})
export class TableModule { }