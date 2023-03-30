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
    const { access_token } = await this.authService.logIn(req.user);
    res.set('X-Access-Token', access_token);
    return res.send();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  async getProfile(@Request() req: any) {
    return this.userService.findById(req.user.id);
  }
}
