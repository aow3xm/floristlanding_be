import {Injectable} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import * as sendgrid from '@sendgrid/mail';
import {TemplateKey, Templates, templates} from './email.config';

@Injectable()
export class EmailService {
  private readonly from: string;

  constructor(private readonly configService: ConfigService) {
    this.from = this.configService.get<string>('SENDGRID_SEND_EMAIL');
    sendgrid.setApiKey(this.configService.get<string>('SENDGRID_API_KEY'));
  }

  async sendEmail<T extends TemplateKey>(
    to: string,
    templateKey: T,
    data: Templates[T]['data'],
  ): Promise<void> {
    const template = templates[templateKey];
    const msg = {
      to,
      from: this.from,
      templateId: template.id,
      dynamicTemplateData: data,
    };

    try {
      await sendgrid.send(msg);
      console.log('Email sent successfully with template');
    } catch (error) {
      console.error('Error sending email with template:', error);
      throw new Error('Failed to send email with template');
    }
  }
}
