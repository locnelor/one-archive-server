import { Injectable } from "@nestjs/common";
import { createHash } from "crypto"
@Injectable()
export class CryptoUtilService {
    public md5(str: string) {
        return createHash("md5").update(str).digest("hex")
    }
    public sha1(str: string) {
        return createHash("sha1").update(str).digest("hex")
    }
    public cryptoPassword(password: string) {
        return this.md5(this.sha1(password));
    }
    public createUid(phone: string) {
        return this.md5(this.sha1(`${phone}_${Date.now()}_${Math.floor(Math.random() * 10000)}`))
    }
}