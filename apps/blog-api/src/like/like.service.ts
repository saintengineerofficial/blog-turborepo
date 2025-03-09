import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateLikeInput } from './dto/create-like.input';
import { UpdateLikeInput } from './dto/update-like.input';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LikeService {
  constructor(private readonly prisma: PrismaService) {}

  async likePost(postId: number, userId: number) {
    try {
      return !!(await this.prisma.like.create({
        data: { userId, postId },
      }));
    } catch (error) {
      throw new BadRequestException('You have already liked this post');
    }
  }

  async unlikePost(postId: number, userId: number) {
    try {
      await this.prisma.like.delete({
        where: { userId_postId: { userId, postId } },
      });
      return true;
    } catch (error) {
      throw new BadRequestException('Like not found');
    }
  }

  async postLikeCount(postId: number) {
    return await this.prisma.like.count({ where: { postId } });
  }

  async userLikePost(postId: number, userId: number) {
    const like = await this.prisma.like.findFirst({
      where: { postId, userId },
    });
    return !!like;
  }
}
