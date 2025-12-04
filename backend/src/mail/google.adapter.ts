import { Injectable } from '@nestjs/common';
import { GoogleService } from './google.service';

interface IMailService {
  sendMail(to: string, subject: string, text: string): Promise<any>;
}

@Injectable()
export class GoogleAdapter implements IMailService {
  constructor(private readonly googleService: GoogleService) {}

  async sendMail(to: string, subject: string, text: string): Promise<any> {
    return await this.googleService.sendEmail(to, subject, text);
  }
}
