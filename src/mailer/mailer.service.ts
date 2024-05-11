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

  async getIPAddress(emails: string[], data: Record<string, any>) {
    if (!emails?.length) return;

    const info = await this.sendMailWithDefaultContext({
      to: emails,
      subject: `HD | IP Адреса ${data?.ipaddress || ''}`,
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

  async createIPAddress(emails: string[], data: Record<string, any>) {
    if (!emails?.length) return;

    const info = await this.sendMailWithDefaultContext({
      to: emails,
      subject: `HD | Додавання IP Адреси ${data?.ipaddress || ''}`,
      template: 'ipaddress',
      context: {
        title: `Додавання IP Адреси ${data?.ipaddress || ''}`,
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

  async removeIPAddress(emails: string[], data: Record<string, any>) {
    if (!emails?.length) return;

    const info = await this.sendMailWithDefaultContext({
      to: emails,
      subject: `HD | Видалення IP Адреси ${data?.ipaddress || ''}`,
      template: 'ipaddress',
      context: {
        title: `Видалення IP Адреси ${data?.ipaddress || ''}`,
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
}
