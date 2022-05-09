import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Account } from "src/system/tables/entity/account.entity";

@Injectable()
export class RuleGuard implements CanActivate {
    constructor(
        private readonly callback: (entity: Account) => boolean
    ) { }
    canActivate(
        context: ExecutionContext
    ) {
        const req = context.switchToHttp().getRequest()
        const user = req.user
        return this.callback(user)
    }
    public static create = (callback: (entity: Account) => boolean) => new RuleGuard(callback)
}
//所有用户
export const allUserGuard = RuleGuard.create(() => true)

//管理员
export const leaderGuard = RuleGuard.create(user => user.user_rule === 2);

//会员
export const adminGuard = RuleGuard.create(user => user.user_rule <= 1);

//用户
export const userGuard = RuleGuard.create(user => user.user_rule <= 0);