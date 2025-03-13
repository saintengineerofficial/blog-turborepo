import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthJwtPayload } from '../types/auth-jwtPayload';
import { AuthService } from '../auth.service';
import { Injectable } from '@nestjs/common';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //从请求头的 Authorization 字段提取 Bearer Token,自动验证
      secretOrKey: configService.get<string>('JWT_SECRET'),
      ignoreExpiration: false, //会拒绝过期令牌
    });
  }

  // 解密后的 JWT 载荷（Payload）传入 validate 方法
  // 返回的用户对象会被附加到 req.user，供后续逻辑使用。
  // validate 返回 null 或抛出异常 → 认证失败。
  validate(payload: AuthJwtPayload) {
    const userId = payload.sub;
    return this.authService.jwtValidateUser(userId);
  }
}
