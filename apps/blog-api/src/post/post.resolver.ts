import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { PostService } from './post.service';
import { Post } from './entities/post.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Query(() => [Post], { name: 'posts' })
  @UseGuards(JwtAuthGuard)
  findAll(@Context() context) {
    const user = context.req.user;
    console.log('🚀 ~ PostResolver ~ findAll ~ user:', user);

    return this.postService.findAll();
  }
}
