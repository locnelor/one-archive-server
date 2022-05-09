import { Global, Module } from "@nestjs/common";
import { CryptoUtilService } from "./crypto.util.service";
import { EmailUtilService } from "./email.util.service";
import { PathUtilService } from "./path.util.service";
import { StrUtilService } from "./str.util.service";

const providers = [CryptoUtilService, StrUtilService, PathUtilService, EmailUtilService]
@Global()
@Module({
    providers,
    exports: providers
})
export class UtilModule { }