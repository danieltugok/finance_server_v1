import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (!user) return null;
    const isMatch = await compareSync(password, user.password);
    if (!isMatch) return null;
    delete user.password;
    return user;
  }

  private async getTokens(
    user_id: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const payload = { sub: user_id };
    const accessToken = await this.jwtService.signAsync(payload);
    const refreshToken = await this.jwtService.signAsync(
      { ...payload, type: 'refresh' },
      { expiresIn: '7d' },
    );
    return {
      accessToken,
      refreshToken,
    };
  }

  async logIn(user: any) {
    return this.getTokens(user.id);
  }

  async refreshToken(refresh_token: string) {
    const { sub, type } = await this.jwtService.verifyAsync(refresh_token);
    if (type !== 'refresh') throw new Error('Invalid token');
    return this.getTokens(sub);
  }
}
