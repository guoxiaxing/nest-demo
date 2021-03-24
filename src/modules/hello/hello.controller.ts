import {
  Controller,
  Headers,
  Get,
  Query,
  Patch,
  Post,
  Body,
  Param,
  Delete,
} from '@nestjs/common';
import { HelloService } from './hello.service';
import { ApiQuery, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { UserRole, Hello } from '../classes/hello';
@Controller('/hello')
export class HelloController {
  constructor(private readonly helloService: HelloService) {}
  // 查询
  @Get()
  // 定义发送该请求必须传递的参数
  // 生命ApiQuery这些参数，是为了让swagger为我们提供录入的入口
  @ApiQuery({ name: 'id', required: true })
  @ApiQuery({ name: 'role', enum: UserRole })
  // 对返回的响应的描述
  @ApiResponse({
    status: 200,
    description: 'get...',
    type: Hello,
  })
  get(@Query('id') id: number, @Headers('token') token: string): string {
    console.log(token);
    return this.helloService.get(+id);
  }
  // 更新 :id表示路径参数
  @Patch(':id')
  @ApiParam({ name: 'id', required: true })
  @ApiBody({ description: '填写body信息' })
  patch(@Param() { id }, @Body() { message }): string {
    console.log(id, message);
    return this.helloService.update(+id, message);
  }
  //   创建
  @Post()
  @ApiBody({ description: '填写body信息' })
  save(@Body('message') message: string): string {
    return this.helloService.post(message);
  }
  // 删除
  @Delete()
  @ApiQuery({ name: 'id', required: true })
  delete(@Query('id') id: string): string {
    return this.helloService.delete(+id);
  }
}
