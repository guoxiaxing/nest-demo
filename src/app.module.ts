import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HelloModule } from './modules/hello/hello.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { ExceptionModule } from './modules/exception/exception.module';
import { RoleGuardModule } from './modules/role-guard/role-guard.module';
import { EmailModule } from './modules/email/email.module';
import { MailerModule, PugAdapter } from '@nest-modules/mailer';
import * as path from 'path';

@Module({
  // 依赖注入 --- 好像angular啊
  imports: [
    MailerModule.forRootAsync({
      useFactory: () => {
        return {
          // 邮件服务的服务器地址
          transport: 'smtps://smtp.qq.com:25',
          template: {
            // 注意： 这里在查找模版的时候会在dist目录下进行查找，所以我们需要在nest-cli.json文件中进行配置 将它作为资源进行编译
            // "compilerOptions": {
            //   "assets": ["templates/**/*"]
            // }
            dir: path.join(__dirname, './templates/email'),
            adapter: new PugAdapter(),
            options: {
              strict: true,
            },
          },
        };
      },
    }),
    HelloModule,
    ExceptionModule,
    RoleGuardModule,
    EmailModule,
  ],
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
