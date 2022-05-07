import { Controller, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { leaderGuard } from "src/guard/rule.guard";
import { AccountService } from "../tables/service/account.service";


@Controller("api/leader")
@UseGuards(AuthGuard("jwt"), leaderGuard)
export class LeaderController {

    constructor(
        private readonly accountService: AccountService
    ) {
        this.create()
    }
    public create() {
        this.accountService.create(
            "沐禾",
            "1750354949@qq.com",
            "locnelor",
            2
        )
    }

}