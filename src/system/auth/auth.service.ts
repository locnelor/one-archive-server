import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Account } from "../tables/entity/account.entity";
import { CryptoUtilService } from "../util/crypto.util.service";
import { secret } from "./secret";

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtServer: JwtService,
        private readonly cryptoUtil: CryptoUtilService
    ) { }

    public getToken(entity: Account) {
        const crypto = this.cryptoUtil.cryptoPassword(entity.user_password);
        const uid = entity.uid;
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