import { Injectable } from "@nestjs/common";

import { PassportStrategy } from "@nestjs/passport";

import {
  ExtractJwt,
  Strategy,
} from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(
  Strategy,
) {
  constructor() {
    super({
      jwtFromRequest: (req) => {
        console.log(req.headers.authorization);
        return ExtractJwt.fromAuthHeaderAsBearerToken()(req);
      },
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || "key2106",
    });
  }

  async validate(payload: any) {
    return {
      userId: payload.sub,
      email: payload.email,
    };
  }
}