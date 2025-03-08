import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { DEFAULT_PAGE_SIZE } from 'src/constant';
import { CreateCommentInput } from './dto/create-comment.input';

@Injectable()
export class CommentService {
  @Inject()
  private readonly prisma: PrismaService;
  async findOneByPost({
    postId,
    take,
    skip,
  }: {
    postId: number;
    take?: number;
    skip?: number;
  }) {
    return await this.prisma.comment.findMany({
      where: { postId },
      include: { author: true },
      orderBy: { createdAt: 'desc' },
      skip: skip ?? 0,
      take: take ?? DEFAULT_PAGE_SIZE,
    });
  }

  async count(postId: number) {
    return this.prisma.comment.count({ where: { postId } });
  }

  async create(createCommentInput: CreateCommentInput, authorId: number) {
    return await this.prisma.comment.create({
      data: {
        content: createCommentInput.content,
        post: { connect: { id: createCommentInput.postId } },
        author: { connect: { id: authorId } },
      },
    });
  }
}
