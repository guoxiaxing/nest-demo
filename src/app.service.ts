import { Injectable } from '@nestjs/common';

// 如果定义的类是需要在provides里面提供，那么这个类必须要使用Injectable装饰器
@Injectable()
export class AppService {
  // 用于进行数据库查询处理得到结果
  getHello(): string {
    return 'Hello World!';
  }
}
