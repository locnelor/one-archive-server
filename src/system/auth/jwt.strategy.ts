import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { IncomingMessage } from 'http';
import { NotFound } from 'src/utils/http';
import { CryptoUtilService } from '../util/crypto.util.service';
import { secret } from './secret';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly cryptoUtil: CryptoUtilService,
    ) {
        super({
            jwtFromRequest: (req: IncomingMessage) => {
                if (!req.headers.cookie) return null;
                const cookies = req.headers.cookie.split(";").reduce((acc, label) => {
                    const split = label.split("=")
                    acc[split[0].trim()] = split[1]
                    return acc;
                }, {} as { token?: string })
                return cookies.token
            },
            ignoreExpiration: true,
            secretOrKey: secret,
        });
    }
    async validate({ uid, crypto }) {
        
        return uid;
    }
}