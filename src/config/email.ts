import { join } from 'path';
import { PugAdapter } from '@nest-modules/mailer';

export default {
  // 邮箱的服务器地址的配置
  transport: 'xxx',
  defaults: {
    from: '"nest-modules" <modules@nestjs.com>',
  },
  template: {
    dir: join(__dirname, '../templates/email'),
    adapter: new PugAdapter(),
    options: {
      strict: true,
    },
  },
};
