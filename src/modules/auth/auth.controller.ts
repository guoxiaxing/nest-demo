import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // 登录测试 普通的鉴权 不需要token 用于获取token
  @UseGuards(AuthGuard('local'))
  @Post('/auth/login')
  async login(@Request() req) {
    // "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJpYXQiOjE2MTY1NzMzNDcsImV4cCI6MTYxNjU3MzQwN30.IVjDKALs4TcjUqlPc8vloGyduUZlGeYzT09Ky0LEP98"
    return this.authService.login(req.user);
  }
  // 测试登录后才可访问的接口，在需要的地方使用守卫，可保证必须携带token才能访问
  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getProfile(@Request() req) {
    return req.user;
  }
}
