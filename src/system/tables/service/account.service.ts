import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CryptoUtilService } from "src/system/util/crypto.util.service";
import { Repository } from "typeorm";
import { Account } from "../entity/account.entity";


@Injectable()
export class AccountService {
    constructor(
        @InjectRepository(Account)
        public readonly account: Repository<Account>,
        private readonly cryptoUtil: CryptoUtilService
    ) { }

    public async create(
        user_name: string,
        user_email: string,
        password: string,
        user_rule = 0
    ) {
        const user_password = this.cryptoUtil.cryptoPassword(password);
        const uid = this.cryptoUtil.createUid(user_email);
        const entity = this.account.create({
            user_name,
            user_email,
            user_password,
            uid,
            user_rule
        });
        await this.account.insert(entity);
    }

    public equalsPassword(
        account: Account,
        password: string
    ) {
        return account.user_password === this.cryptoUtil.cryptoPassword(password)
    }
    
}