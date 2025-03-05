/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Controller,
  Get,
  Inject,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  googleLogin() {}

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleCallback(@Request() req, @Res() res: Response) {
    console.log('🚀 ~ AuthController ~ googleCallback ~ req:', req.user);
    const userData = await this.authService.login(req.user);
    res.redirect(
      `http://localhost:3000/api/auth/google/callback?userId=${userData.id}&name=${userData.name}&avatar=${userData.avatar}&accessToken=${userData.accessToken}`,
    );
  }

  @Get('verify-token')
  @UseGuards(JwtAuthGuard)
  async verifyToken() {
    return 'ok';
  }
}
