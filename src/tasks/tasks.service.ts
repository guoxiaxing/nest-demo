import { Injectable, Logger } from '@nestjs/common';
import { Cron, Interval, Timeout } from '@nestjs/schedule';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  // 秒 分 时 天（一个月中的某天） 月 天（一周中的某天）
  @Cron('45 * * * * *')
  handleCron() {
    this.logger.debug('Called when the second is 45');
  }

  // 每10s执行一次
  @Interval(10000)
  handleInterval() {
    this.logger.debug('Called every 10 seconds');
  }

  //五秒后执行
  @Timeout(5000)
  handleTimeout() {
    this.logger.debug('Called once after 5 seconds');
  }
}
