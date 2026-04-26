import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AddressesModule } from './addresses/addresses.module';
import { AuthModule } from './auth/auth.module';
import { BooksModule } from './books/books.module';
import { CartModule } from './cart/cart.module';
import { ContactModule } from './contact/contact.module';
import { HealthController } from './health.controller';
import { JwtSharedModule } from './jwt/jwt-shared.module';
import { OrdersModule } from './orders/orders.module';
import { PrismaModule } from './prisma/prisma.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JwtSharedModule,
    PrismaModule,
    AuthModule,
    BooksModule,
    CartModule,
    OrdersModule,
    ContactModule,
    AddressesModule,
    CloudinaryModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
