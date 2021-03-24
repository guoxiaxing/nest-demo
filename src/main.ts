import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 全局使用中间件
  // app.use(logger)

  // 全局过滤器
  app.useGlobalFilters(new HttpExceptionFilter());
  // 设置swagger相关配置
  const swaggerOptions = new DocumentBuilder()
    // 标题
    .setTitle('nest-demo api ducument')
    // 描述
    .setDescription('nest-demo api ducument')
    // 版本
    .setVersion('2.0')
    // 鉴权
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerOptions);
  // http://localhost:3001/doc/#/ 可以查看我们的api文档
  // doc 访问路径
  SwaggerModule.setup('doc', app, document);
  await app.listen(3001);
}
bootstrap();
