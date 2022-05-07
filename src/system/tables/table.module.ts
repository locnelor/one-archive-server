import { Global, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Account } from "./entity/account.entity";
import { AccountService } from "./service/account.service";

const providers = [AccountService]
@Global()
@Module({
    imports: [TypeOrmModule.forFeature([
        Account
    ])],
    providers,
    exports: providers
})
export class TableModule { }