import { Injectable } from "@nestjs/common";
import { AUTHORIZATION_HEADER } from "../../config/constants/constants";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromHeader(AUTHORIZATION_HEADER.toLowerCase()),
      ignoreExpiration: false,
      secretOrKey: process.env.TOKEN_SECRET,
    });
  }

  async validate(payload: any) {
    return payload;
  }
}

