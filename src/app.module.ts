import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HelloModule } from './modules/hello/hello.module';

@Module({
  // 依赖注入 --- 好像angular啊
  imports: [HelloModule],
  controllers: [AppController],
  // 提供 服务 和 依赖
  providers: [AppService],
})
export class AppModule {}
