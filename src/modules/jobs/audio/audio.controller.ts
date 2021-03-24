import { InjectQueue } from '@nestjs/bull';
import { Controller, Post } from '@nestjs/common';
import { Queue } from 'bull';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('audio')
@Controller('audio')
export class AudioController {
  constructor(@InjectQueue('audio') private readonly audioQueue: Queue) {}

  @Post('transcode')
  async transcode() {
    // 第一个参数是队列名，第二个是队列的data，第三个是队列相关的配置
    await this.audioQueue.add(
      'transcode',
      {
        file: 'audio.mp3',
      },
      { delay: 1000 },
    );
  }
}
