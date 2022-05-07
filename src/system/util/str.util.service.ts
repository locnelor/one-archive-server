import { Injectable } from "@nestjs/common";

@Injectable()
export class StrUtilService {
    public cryptoStr(str: string, play: number, limit: number, char = "*") {
        if (!str) return null;
        return str.slice(0, play) +
            new Array(limit).fill(char).join("") +
            str.slice(play + limit);
    }
}