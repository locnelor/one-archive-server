import { Global, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

const providers = []
@Global()
@Module({
    imports: [TypeOrmModule.forFeature([
    ])],
    providers,
    exports: providers
})
export class TableModule { }