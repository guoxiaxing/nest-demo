import {
  Controller,
  Get,
  Post,
  Patch,
  Query,
  Delete,
  Body,
  Param,
  Headers,
  UseFilters,
  HttpException,
  HttpStatus,
  // ParseIntPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';
import { ExceptionService } from './exception.service';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';
import { ParseIntPipe } from '../../common/pipes/parse-int.pipe';

@ApiBearerAuth()
@ApiTags('exception')
// 局部使用过滤器 过滤器的作用就是可以将错误拦截，然后对返回的response格式进行统一
// 注意，这里只会对exception下的接口的异常进行处理
// 故/exception/xxx等接口都不会走到这个过滤器，所以可以全局添加过滤器，对所有接口进行过滤
// @UseFilters(new HttpExceptionFilter())
@Controller('/exception')
export class ExceptionController {
  constructor(private readonly exceptionService: ExceptionService) {}

  // 查询
  @Get()
  @ApiQuery({ name: 'id', required: true })
  // 对返回的响应的描述
  @ApiResponse({
    status: 200,
    description: 'get...',
  })
  fetch(@Query() { id }): string {
    if (!id) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: '请求参数id 必传',
          error: 'id is required',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.exceptionService.fetch(id);
  }

  // 创建
  @Post()
  @ApiBody({ description: '填写更新内容' })
  save(@Body() { message, id }): string {
    return this.exceptionService.save(message);
  }

  // 更新
  @Patch(':id')
  @ApiParam({ name: 'id' })
  @ApiBody({ description: '请输入message' })
  // 有时，我们希望参数的类型为数字，则可以通过管道进行转换
  // 局部管道
  // 注意使用的方式是作为@Param装饰器的第二个参数，会将处理后的值赋值给变量id
  // !现nest自带部分管道
  update(@Param('id', new ParseIntPipe()) id, @Body() { message }): string {
    console.log(typeof id);
    return this.exceptionService.update(id, message);
  }

  // 删除
  @Delete()
  @ApiQuery({ name: 'id', required: true })
  remove(@Query('id') id: number): string {
    return this.exceptionService.remove(id);
  }
}
