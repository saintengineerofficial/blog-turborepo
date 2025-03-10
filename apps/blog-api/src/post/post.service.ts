import { Injectable, UnauthorizedException } from '@nestjs/common';
import { DEFAULT_PAGE_SIZE } from 'src/constant';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';

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
      orderBy: { createdAt: 'desc' },
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

  async create(createPostInout: CreatePostInput, authorId: number) {
    return await this.prisma.post.create({
      data: {
        ...createPostInout,
        author: { connect: { id: authorId } },
        tags: {
          connectOrCreate: createPostInout.tags.map((tag) => ({
            where: { name: tag },
            create: { name: tag },
          })),
        },
      },
    });
  }

  async update(updatePostInput: UpdatePostInput, authorId: number) {
    const matchedAuthorId = await this.prisma.post.findUnique({
      where: { id: updatePostInput.postId, authorId },
    });

    if (!matchedAuthorId) throw new UnauthorizedException();

    const { postId, ...data } = updatePostInput;
    return await this.prisma.post.update({
      where: { id: postId },
      data: {
        ...data,
        tags: {
          set: [],
          connectOrCreate: updatePostInput.tags!.map((tag) => ({
            where: { name: tag },
            create: { name: tag },
          })),
        },
      },
    });
  }

  async delete(postId: number, authorId: number) {
    const matchedAuthorId = await this.prisma.post.findUnique({
      where: { id: postId, authorId },
    });

    if (!matchedAuthorId) throw new UnauthorizedException();

    const result = await this.prisma.post.delete({
      where: { id: postId, authorId },
    });

    return !!result;
  }
}
