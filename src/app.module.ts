import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HelloModule } from './modules/hello/hello.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';

@Module({
  // 依赖注入 --- 好像angular啊
  imports: [HelloModule],
  controllers: [AppController],
  // 提供 服务 和 依赖
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    // 为hello 服务添加中间件
    consumer
      .apply(LoggerMiddleware)
      // 排除hello路径的post方法
      .exclude({ path: 'hello', method: RequestMethod.POST })
      .forRoutes('hello');
  }
}
