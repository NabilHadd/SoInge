import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { ProductModule } from './product/product.module';
import { MailModule } from './mail/mail.module';
import { CompraModule } from './compra/compra.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // hace que ConfigService esté disponible en toda la app
    }),
    UsersModule,
    AuthModule,
    ProductModule,
    MailModule,
    CompraModule
  ],
  providers: [PrismaService],
})
export class AppModule {}
