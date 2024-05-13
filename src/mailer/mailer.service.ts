import { Inject, Injectable } from '@nestjs/common';
import { dateToLocaleStr } from 'src/common/utils/lib.util';

@Injectable()
export class MailerService {
  constructor(@Inject('MAILER') private readonly transporter: any) {}

  private async verifyConnection() {
    return await this.transporter.verify();
  }

  private async sendMailWithDefaultContext(options: Record<string, any>) {
    const defaultContext = {
      title: 'Notification',
      copyright: `Copyright © ${new Date().getFullYear()}. All rights reserved.`
    };

    try {
      const response = await this.transporter.sendMail({
        ...options,
        subject: options?.subject?.toUpperCase() || '',
        context: {
          ...defaultContext,
          ...(options.context || {})
        }
      });

      console.info('MESSAGE SENT: %s', response.messageId, response.accepted);

      return response;
    } catch (err) {
      console.error(err.message);

      return;
    }
  }

  async sendNotice(emails: string[], data: Record<string, any>) {
    if (!emails?.length) return;

    return await this.sendMailWithDefaultContext({
      to: emails,
      subject: 'HD | Notification',
      template: 'notice',
      context: {
        title: data.title,
        text: data.text
      }
    });
  }

  async sendIPAddress(
    emails: string[],
    data: Record<string, any>,
    subject: string | undefined | null
  ) {
    if (!emails?.length) return;

    return await this.sendMailWithDefaultContext({
      to: emails,
      subject: subject
        ? `HD | ${subject} ${data?.ipaddress || ''}`
        : `HD | IP Address ${data?.ipaddress || ''}`,
      template: 'ipaddress',
      context: {
        title: `IP Address ${data?.ipaddress || ''}`,
        ipaddress: data?.ipaddress || '-',
        mask: data?.mask || '-',
        gateway: data?.gateway || '-',
        reqnum: data?.reqnum || '-',
        date: dateToLocaleStr(data?.date),
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
  }

  async sendMailbox(
    emails: string[],
    data: Record<string, any>,
    subject: string | undefined | null
  ) {
    if (!emails?.length) return;

    return await this.sendMailWithDefaultContext({
      to: emails,
      subject: subject ? `HD | ${subject} ${data?.login || ''}` : `HD | EMAIL ${data?.login || ''}`,
      template: 'mailbox',
      context: {
        title: `Login ${data?.login || ''}`,
        login: data?.login || '',
        reqnum: data?.reqnum || '-',
        dateOpen: dateToLocaleStr(data?.dateOpen),
        dateClose: dateToLocaleStr(data?.dateClose || new Date()),
        fullname: data?.fullname || '-',
        phone: data?.phone || '-',
        organization: data?.organization?.name || '-',
        subdivision: data?.subdivision?.name || '-',
        department: data?.department?.name || '-',
        position: data?.position?.name || '-',
        comment: data?.comment || '-'
      }
    });
  }

  async sendProfile(email: string, data: Record<string, any>) {
    if (!email?.length) return;

    return await this.sendMailWithDefaultContext({
      to: email,
      subject: 'HD | Authorization',
      template: 'profile',
      context: {
        title: 'Successful authorization',
        email: data.email,
        password: data.password,
        fullname: data.fullname
      }
    });
  }

  async sendProfileNotice(email: string[], data: Record<string, any>) {
    if (!email?.length) return;

    return await this.sendMailWithDefaultContext({
      to: email,
      subject: 'HD | Authorization',
      template: 'profile',
      context: {
        title: 'New profile',
        email: data.email,
        phone: data.phone,
        fullname: data.fullname
      }
    });
  }

  async sendResetPassword(email: string, data: Record<string, any>) {
    if (!email?.length) return;

    return await this.sendMailWithDefaultContext({
      to: email,
      subject: 'HD | Authorization',
      template: 'profile',
      context: {
        title: 'Password recovery',
        email: data.email,
        password: data.password,
        fullname: data.fullname
      }
    });
  }
}
