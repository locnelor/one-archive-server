
import { Controller, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { adminGuard } from "src/guard/rule.guard";


@Controller("api/admin")
@UseGuards(AuthGuard("jwt"), adminGuard)
export class AdminController {

    constructor(

    ) { }

}