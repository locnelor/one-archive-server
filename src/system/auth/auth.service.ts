import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { CryptoUtilService } from "../util/crypto.util.service";
import { secret } from "./secret";

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtServer: JwtService,
        private readonly cryptoUtil: CryptoUtilService
    ) { }

    public getToken(entity: any) {
        const crypto = this.cryptoUtil.cryptoPassword(entity.user_password);
        const uid = entity.user_key;
        return {
            token: this.jwtServer.sign({
                uid,
                crypto
            }, {
                secret: secret
            })
        }
    }

}