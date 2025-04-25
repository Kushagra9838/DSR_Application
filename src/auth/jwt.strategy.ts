import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
// import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    // private readonly configService: ConfigService,
    private readonly userService: UserService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: "yourSecretKey",
    });
  }

  async validate(payload: { sub: string }) {

    const user = await this.userService.findById(payload.sub);
    // console.log(user);
    if (!user) {
      return null;
    }

    // This will be attached to request.user
    return { id: user.id};
  }
}
