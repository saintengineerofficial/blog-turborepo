import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configServie: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      clientID: configServie.get<string>('GOOGLE_CLIENT_ID'),
      clientSecret: configServie.get<string>('GOOGLE_CLIENT_SECRET'),
      callbackURL: configServie.get<string>('GOOGLE_CALLBACK_URL'),
      proxy: true,
      scope: ['profile', 'email'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ) {
    const user = await this.authService.validateGoogleUser({
      email: profile.emails[0].value,
      name: profile.displayName,
      avatar: profile.photosp[0].value,
      password: '',
    });
    done(null, user);
  }
}
