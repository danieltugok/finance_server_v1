import {
  Controller,
  Get,
  Head,
  HttpCode,
  Post,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';

@Controller('api/v1/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req: any) {
    return this.authService.logIn(req.user);
  }

  @UseGuards(AuthGuard('basic'))
  @Head('login')
  @HttpCode(204)
  async basicLogin(@Request() req: any, @Response() res: any) {
    const { accessToken, refreshToken } = await this.authService.logIn(
      req.user,
    );
    res.set('X-Access-Token', accessToken);
    res.set('X-Refresh-Token', refreshToken);
    return res.send();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  async getProfile(@Request() req: any) {
    console.log(req.user.id);
    return this.userService.findById(req.user.id);
  }

  @Head('refresh')
  @HttpCode(204)
  async refreshToken(@Request() req: any, @Response() res: any) {
    const token = req.headers['authorization'].split(' ')[1];
    const { accessToken, refreshToken } = await this.authService.refreshToken(
      token,
    );
    res.set('X-Access-Token', accessToken);
    res.set('X-Refresh-Token', refreshToken);
    return res.send();
  }
}
