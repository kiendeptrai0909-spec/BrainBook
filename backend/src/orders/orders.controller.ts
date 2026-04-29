import { BadRequestException, Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { CurrentUser, JwtUser } from '../common/current-user.decorator';
import { OptionalJwtGuard } from '../auth/optional-jwt.guard';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly orders: OrdersService) {}

  @Post()
  @UseGuards(OptionalJwtGuard)
  create(@Body() dto: CreateOrderDto, @CurrentUser() user: JwtUser | undefined) {
    return this.orders.create(dto, user);
  }

  @Get('lookup')
  lookup(@Query('orderNumber') orderNumber: string, @Query('email') email?: string) {
    if (!orderNumber?.trim()) throw new BadRequestException('orderNumber is required');
    return this.orders.findByOrderNumber(orderNumber.trim(), email);
  }

  @Get()
  findAll() {
    return this.orders.findAll();
  }
}
