import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentResolver } from './comment.resolver';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [CommentResolver, CommentService, PrismaService],
})
export class CommentModule {}
