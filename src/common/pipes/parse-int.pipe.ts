import {
  Injectable,
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

// Injectable 装饰并且实现 PipeTransform
@Injectable()
export class ParseIntPipe implements PipeTransform<string> {
  // 定义transform方法，注意是async函数
  // 可以接受到我们使用 pipe 的后面的变量
  async transform(value: string, metadata: ArgumentMetadata) {
    const val = parseInt(value, 10);
    if (Number.isNaN(val)) {
      throw new BadRequestException('parseInt fail');
    }
    return val;
  }
}
