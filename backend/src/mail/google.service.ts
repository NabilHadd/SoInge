import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class GoogleService {
  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  async sendEmail(to: string, subject: string, text: string) {
    const mailOptions = {
      from: process.env.MAIL_FROM,
      to,
      subject,
      text,
    };

    return await this.transporter.sendMail(mailOptions);
  }
}
