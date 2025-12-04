import { Module } from '@nestjs/common';
import { MailController } from './mail.controller';
import { GoogleAdapter } from './google.adapter';
import { GoogleService } from './google.service';

@Module({
  controllers: [MailController],
  providers: [GoogleAdapter, GoogleService], // <-- IMPORTANTE
})
export class MailModule {}
