import { Injectable } from '@nestjs/common';
import { DEFAULT_PAGE_SIZE } from 'src/constant';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async findAll({
    skip = 0,
    take = DEFAULT_PAGE_SIZE,
  }: {
    skip?: number;
    take?: number;
  }) {
    return await this.prisma.post.findMany({
      skip,
      take,
    });
  }

  async count() {
    return await this.prisma.post.count();
  }

  async findOne(id: number) {
    return await this.prisma.post.findFirst({
      where: { id },
      include: { author: true, tags: true },
    });
  }

  async findPostByUser({
    userId,
    skip,
    take,
  }: {
    userId: number;
    skip: number;
    take: number;
  }) {
    return this.prisma.post.findMany({
      where: { authorId: userId },
      select: {
        id: true,
        content: true,
        createdAt: true,
        published: true,
        slug: true,
        title: true,
        thumbnail: true,
        _count: { select: { likes: true, comments: true } },
      },
      skip,
      take,
    });
  }

  async userPostCount(userId: number) {
    return await this.prisma.post.count({ where: { authorId: userId } });
  }
}
