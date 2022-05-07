import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";

@Injectable()
export class RuleGuard implements CanActivate {
    constructor(
        private readonly callback: (entity: any) => boolean
    ) { }
    canActivate(
        context: ExecutionContext
    ) {
        const req = context.switchToHttp().getRequest()
        const user = req.user
        return this.callback(user)
    }
    public static create = (callback: (entity: any) => boolean) => new RuleGuard(callback)
}
//所有用户
export const allUserGuard = RuleGuard.create(() => true)
