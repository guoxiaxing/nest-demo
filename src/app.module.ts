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
import { resolve } from 'path';
import { ConfigModule, ConfigService } from 'nestjs-config';
import { StatusMonitorModule } from 'nest-status-monitor';
import StatusMonitorConfig from './config/statusMonitor';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';
import { ScheduleModule } from '@nestjs/schedule';
import { AudioModule } from './modules/jobs/audio/audio.module';
import { AlbumModule } from './modules/album/album.module';

@Module({
  // 依赖注入 --- 好像angular啊
  imports: [
    // 声明将哪些文件作为config 然后我们就可以通过注入configService来使用了
    ConfigModule.load(resolve(__dirname, 'config', '**/!(*.d).{ts,js}')),
    // 传入配置文件
    StatusMonitorModule.setUp(StatusMonitorConfig),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => config.get('database'),
      inject: [ConfigService],
    }),
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
      // useFactory: (config: ConfigService) => config.get('email'),
      // inject: [ConfigService],
    }),
    HelloModule,
    ExceptionModule,
    RoleGuardModule,
    EmailModule,
    AuthModule,
    UsersModule,
    // 需要添加这个来实现定时任务的执行，否则只引入 TasksModule 不会执行
    // ScheduleModule.forRoot(),
    // TasksModule,
    AudioModule,
    AlbumModule,
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
