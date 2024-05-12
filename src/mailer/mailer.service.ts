import { Inject, Injectable } from '@nestjs/common';
import { dateToLocaleStr } from 'src/common/utils/lib.util';

@Injectable()
export class MailerService {
  constructor(@Inject('MAILER') private readonly transporter: any) {}

  private verifyConnection() {
    return this.transporter.verify();
  }

  private async sendMailWithDefaultContext(options: Record<string, any>) {
    const defaultContext = {
      title: 'Повідомлення',
      copyright: `Copyright © ${new Date().getFullYear()}. All rights reserved.`
    };

    return this.transporter.sendMail({
      ...options,
      context: {
        ...defaultContext,
        ...(options.context || {})
      }
    });
  }

  async sendNotice(emails: string[], data: Record<string, any>) {
    if (!emails?.length) return;

    const info = await this.sendMailWithDefaultContext({
      to: emails,
      subject: 'HD | Повідомлення',
      template: 'notice',
      context: {
        title: data.title,
        text: data.text
      }
    });

    console.info('Message sent: %s', info.messageId);
  }

  async sendIPAddress(
    emails: string[],
    data: Record<string, any>,
    subject: string | undefined | null
  ) {
    if (!emails?.length) return;

    const info = await this.sendMailWithDefaultContext({
      to: emails,
      subject: subject
        ? `HD | ${subject} ${data?.ipaddress || ''}`
        : `HD | IP Адреса ${data?.ipaddress || ''}`,
      template: 'ipaddress',
      context: {
        title: `IP Адреса ${data?.ipaddress || ''}`,
        copyright: `Copyright © ${new Date().getFullYear()}. All rights reserved.`,
        ipaddress: data?.ipaddress || '-',
        mask: data?.mask || '-',
        gateway: data?.gateway || '-',
        reqnum: data?.reqnum || '-',
        date: dateToLocaleStr(data?.date || '-'),
        fullname: data?.fullname || '-',
        phone: data?.phone || '-',
        organization: data?.organization?.name || '-',
        subdivision: data?.subdivision?.name || '-',
        department: data?.department?.name || '-',
        position: data?.position?.name || '-',
        comment: data?.comment || '-',
        internetReqnum: data?.internet?.reqnum || '-',
        internetDateOpen: dateToLocaleStr(data?.internet?.dateOpen),
        internetDateClose: dateToLocaleStr(data?.internet?.dateClose),
        internetComment: data?.internet?.comment || '-'
      }
    });

    console.info('Message sent: %s', info.messageId);
  }

  async sendProfile(email: string, data: Record<string, any>) {
    if (!email?.length) return;

    const info = await this.sendMailWithDefaultContext({
      to: email,
      subject: 'HD | Авторизація',
      template: 'profile',
      context: {
        title: 'Успішна авторизація',
        email: data.email,
        password: data.password,
        fullname: data.fullname
      }
    });

    console.info('Message sent: %s', info.messageId);
  }

  async sendProfileNotice(email: string[], data: Record<string, any>) {
    if (!email?.length) return;

    const info = await this.sendMailWithDefaultContext({
      to: email,
      subject: 'HD | Авторизація',
      template: 'profile',
      context: {
        title: 'Новий профіль',
        email: data.email,
        phone: data.phone,
        fullname: data.fullname
      }
    });

    console.info('Message sent: %s', info.messageId);
  }

  async sendResetPassword(email: string, data: Record<string, any>) {
    if (!email?.length) return;

    const info = await this.sendMailWithDefaultContext({
      to: email,
      subject: 'HD | Авторизація',
      template: 'profile',
      context: {
        title: 'Відновлення паролю',
        email: data.email,
        password: data.password,
        fullname: data.fullname
      }
    });

    console.info('Message sent: %s', info.messageId);
  }
}
