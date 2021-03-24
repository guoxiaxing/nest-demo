import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

// 客户端发送的请求，经过guard检测没有问题才会走到controller内部
// 用于鉴权
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // 需要和Roles装饰器一起使用
    // 取roles
    // return true 表示通过
    // return false 表示拒绝
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    console.log(roles);
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const { user } = request.query;
    // const hasRole = () =>
    //   user.roles.some(role => !!roles.find(item => item === role));

    // return user && user.roles && hasRole();
    return !!roles.find((role) => role === user);
  }
}
