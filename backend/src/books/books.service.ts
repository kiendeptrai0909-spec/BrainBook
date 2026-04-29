import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { QueryBooksDto } from './dto/query-books.dto';
import { CreateBookDto } from './dto/create-book.dto';

const bookInclude = {
  author: true,
  publisher: true,
  inventory: true,
  images: { orderBy: { sortOrder: 'asc' as const } },
  categories: { include: { category: true } },
  tags: { include: { tag: true } },
} satisfies Prisma.BookInclude;

type BookRow = Prisma.BookGetPayload<{ include: typeof bookInclude }>;

@Injectable()
export class BooksService {
  constructor(private readonly prisma: PrismaService) {}

  async findPage(dto: QueryBooksDto) {
    const page = dto.page ?? 1;
    const limit = dto.limit ?? 12;
    const skip = (page - 1) * limit;

    const where: Prisma.BookWhereInput = { isActive: true };
    if (dto.q?.trim()) {
      const q = dto.q.trim();
      where.OR = [
        { title: { contains: q, mode: 'insensitive' } },
        { sku: { contains: q, mode: 'insensitive' } },
      ];
    }
    if (dto.categorySlug?.trim()) {
      where.categories = { some: { category: { slug: dto.categorySlug.trim() } } };
    }

    if (dto.minPrice !== undefined || dto.maxPrice !== undefined) {
      where.price = {};
      if (dto.minPrice !== undefined) (where.price as any).gte = dto.minPrice;
      if (dto.maxPrice !== undefined) (where.price as any).lte = dto.maxPrice;
    }

    let orderBy: Prisma.BookOrderByWithRelationInput = { createdAt: 'desc' };
    if (dto.sort === 'price_asc') {
      orderBy = { price: 'asc' };
    } else if (dto.sort === 'price_desc') {
      orderBy = { price: 'desc' };
    } else if (dto.sort === 'best_seller') {
      orderBy = { reviewCount: 'desc' };
    }

    const [total, rows] = await this.prisma.$transaction([
      this.prisma.book.count({ where }),
      this.prisma.book.findMany({
        where,
        skip,
        take: limit,
        orderBy,
        include: bookInclude,
      }),
    ]);

    return {
      data: rows.map((b) => this.serialize(b)),
      meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }

  async findBySlug(slug: string) {
    const book = await this.prisma.book.findFirst({
      where: { slug, isActive: true },
      include: bookInclude,
    });
    if (!book) throw new NotFoundException('Book not found');
    return this.serialize(book);
  }

  private serialize(book: BookRow) {
    return {
      id: book.id,
      sku: book.sku,
      slug: book.slug,
      title: book.title,
      author: book.author.name,
      price: book.price.toNumber(),
      compareAtPrice: book.compareAtPrice?.toNumber() ?? null,
      imageUrl: book.imageUrl,
      description: book.description,
      longDescription: book.longDescription,
      stock: Math.max(0, (book.inventory?.stock ?? 0) - (book.inventory?.reserved ?? 0)),
      format: book.format,
      publisher: book.publisher?.name ?? null,
      language: book.language,
      pageCount: book.pageCount,
      isbn10: book.isbn10,
      dimensions: book.dimensions,
      ratingAvg: book.ratingAvg?.toNumber() ?? null,
      reviewCount: book.reviewCount,
      images: book.images.map((i) => ({ id: i.id, url: i.url, sortOrder: i.sortOrder })),
      categories: book.categories.map((c) => ({ id: c.category.id, name: c.category.name, slug: c.category.slug })),
      tags: book.tags.map((t) => ({ id: t.tag.id, name: t.tag.name, slug: t.tag.slug })),
    };
  }

  async create(dto: CreateBookDto) {
    const slug = dto.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const authorId = dto.authorId || 1; // Default to first author if not provided

    const data: Prisma.BookCreateInput = {
      title: dto.title,
      sku: dto.sku,
      slug: slug,
      price: dto.price,
      description: dto.description || '',
      format: 'Paperback',
      imageUrl: dto.imageUrl || '',
      author: { connect: { id: authorId } },
      inventory: { create: { stock: dto.stock } },
    };

    if (dto.categoryIds && dto.categoryIds.length > 0) {
      data.categories = {
        create: dto.categoryIds.map(id => ({
          category: { connect: { id } }
        }))
      };
    }

    const book = await this.prisma.book.create({
      data,
      include: bookInclude,
    });
    
    return this.serialize(book);
  }
}
