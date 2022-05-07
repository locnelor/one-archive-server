import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CryptoUtilService } from "../util/crypto.util.service";
import { AuthService } from "./auth.service";

@Controller("auth")
@ApiTags("用户登录")
export class AuthController {
    constructor(
        private readonly authServer: AuthService,
        private readonly cryptoUtil: CryptoUtilService
    ) { }


}