import { Controller, Get, Param, Query, Post, Body } from '@nestjs/common';
import { BooksService } from './books.service';
import { QueryBooksDto } from './dto/query-books.dto';
import { CreateBookDto } from './dto/create-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly books: BooksService) {}

  @Get()
  list(@Query() query: QueryBooksDto) {
    return this.books.findPage(query);
  }

  @Get('slug/:slug')
  bySlug(@Param('slug') slug: string) {
    return this.books.findBySlug(slug);
  }

  @Post()
  create(@Body() dto: CreateBookDto) {
    return this.books.create(dto);
  }
}
