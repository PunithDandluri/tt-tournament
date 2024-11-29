import { Body, Controller, Post } from '@nestjs/common';
import { log } from 'console';
import { LoginReqDTO } from 'src/dto/req/LoginReqDTO';
import { AuthService } from './auth.service';
import { stat } from 'fs';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('login')
  async login(@Body() loginReqDTO: LoginReqDTO) {
    const accessToken = await this.authService.login(loginReqDTO);
    return {
      status: 'success',
      accessToken,
    };
  }
}
