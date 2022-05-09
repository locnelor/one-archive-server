import { Module } from "@nestjs/common";
import { ArchiveController } from "./archive.controller";
import { ArchiveService } from "./services/archive.service";
import { WebController } from "./web.controller";


@Module({
    controllers: [ArchiveController, WebController],
    providers: [ArchiveService]
})
export class BasicModule { }