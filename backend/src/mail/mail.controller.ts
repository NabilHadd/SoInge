import { Controller, Post, Body } from '@nestjs/common';
import { GoogleAdapter } from './google.adapter';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: GoogleAdapter) {}

  @Post('send')
  async sendEmail(@Body() body: { to: string; subject: string; text: string }) {
    return this.mailService.sendMail(body.to, body.subject, body.text);
  }
}
