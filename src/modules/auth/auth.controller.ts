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

  // Get file from file ./src/modules/auth/strategies/local.strategy.ts
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req: any) {
    return this.authService.logIn(req.user);
  }

  // Get file from file ./src/modules/auth/strategies/basic.strategy.ts
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

  // Get file from file ./src/modules/auth/strategies/jwt.strategy.ts
  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  async getProfile(@Request() req: any) {
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
