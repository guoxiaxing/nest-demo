import { Injectable, NestMiddleware } from '@nestjs/common';
// nestjs 基于 express
import { Request, Response } from 'express';

// 中间件英语在请求和到达服务器的响应之间加一些操作
// 中间件也是一个需要注入的东西，所以需要Injectable装饰器

// 中间件还需要实现NestMiddleware
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  // 实现use方法
  use(req: Request, res: Response, next: () => void) {
    const { method, path } = req;
    console.log(`${method} ${path}`);
    // 打印完成之后继续向下执行
    next();
  }
}
