import { Controller, Get, Query } from '@nestjs/common';
// Post, Put 等等
import { AppService } from './app.service';

// 负责请求和响应 --- 有点想service 只不过service可以直接通过 provideIn: 'root' 来在全局注入使用，不需要在特定类中注入
// 一个请求的路径以 app 开头的话就会进入这个 controller
// @Controller('/app')
// 指明这个类是控制器
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // 请求方法
  // 指明请求的方法
  // 请求的路径
  // http://localhost:3000/app 才可以出现这个接口的放回结果，否则返回的是404
  // 接收参数 Query Param Path
  // @Query('name') 可以通过传递参数来筛选中query对象中具体的参数值
  @Get('/app')
  getHello(@Query('name') name: string): string {
    // Query 不传递参数的话默认就是query对象
    console.log(name);
    // 一般controller用于写业务相关的事情，不参与数据的处理，所以一般返回service的处理结果
    return this.appService.getHello();
  }
}
