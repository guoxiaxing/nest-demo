// http 异常过滤器

// 客户端发送到服务器的请求，会先经过过滤器进行过滤，然后再经过pipe管道，最后到达服务器

import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

// 需要实现 ExceptionFilter 接口
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter<HttpException> {
  // 实现catch方法
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus();
    console.log(exception);
    const exceptionRes: any = exception.getResponse();
    const { error, message } = exceptionRes;

    response.status(status).json({
      status,
      timestamp: new Date().toISOString(),
      path: request.url,
      error,
      message,
    });
  }
}
