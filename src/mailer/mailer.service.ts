import { Inject, Injectable } from '@nestjs/common';
import { Transporter } from 'nodemailer';

import { ipaddressHTMLTable } from 'src/common/templates/ipaddress';

@Injectable()
export class MailerService {
  constructor(@Inject('MAILER') private readonly transporter: Transporter) {}

  async createIPAddress(emails: string[], data: Record<string, any>) {
    if (!emails?.length) return;

    const info = await this.transporter.sendMail({
      to: emails,
      subject: `HD - Додавання IP Адреси ${data?.ipaddress || ''}`,
      html: ipaddressHTMLTable(data)
    });

    console.info('Message sent: %s', info.messageId);
  }

  async removeIPAddress(emails: string[], data: Record<string, any>) {
    if (!emails?.length) return;

    const info = await this.transporter.sendMail({
      to: emails,
      subject: `HD - Видалення IP Адреси ${data?.ipaddress || ''}`,
      html: ipaddressHTMLTable(data)
    });

    console.info('Message sent: %s', info.messageId);
  }
}
