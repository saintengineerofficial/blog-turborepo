import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { LikeService } from './like.service';
import { Like } from './entities/like.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Resolver(() => Like)
export class LikeResolver {
  constructor(private readonly likeService: LikeService) {}

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard)
  async likePost(
    @Args('postId', { type: () => Int! }) postId: number,
    @Context() Context,
  ) {
    const userId = Context.req.user.id;
    return this.likeService.likePost(postId, userId);
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard)
  async unlikePost(
    @Args('postId', { type: () => Int! }) postId: number,
    @Context() Context,
  ) {
    const userId = Context.req.user.id;
    return this.likeService.unlikePost(postId, userId);
  }

  @Query(() => Int)
  async postLikeCount(@Args('postId', { type: () => Int! }) postId: number) {
    return this.likeService.postLikeCount(postId);
  }

  @Query(() => Boolean)
  @UseGuards(JwtAuthGuard)
  async userLikePost(
    @Args('postId', { type: () => Int! }) postId: number,
    @Context() Context,
  ) {
    const userId = Context.req.user.id;
    return this.likeService.userLikePost(postId, userId);
  }
}
