import { Injectable } from '@nestjs/common';
import { MailerService } from '@nest-modules/mailer';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  sendEmail() {
    this.mailerService.sendMail({
      to: 'guoxx03@yuanfudao.com',
      from: 'guoxiaxing@qq.com',
      // subject: 'Testing Nest MailerModule ✔',
      subject: 'Test Send Email ✔',
      // html: '<b>Welcome Frost!</b>',
      template: 'welcome',
    });
  }
}
