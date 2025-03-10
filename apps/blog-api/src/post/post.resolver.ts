import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { PostService } from './post.service';
import { Post } from './entities/post.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { DEFAULT_PAGE_SIZE } from 'src/constant';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';

@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Query(() => [Post], { name: 'posts' })
  getPost(
    @Args('skip', { nullable: true }) skip?: number,
    @Args('take', { nullable: true }) take?: number,
  ) {
    return this.postService.findAll({ take, skip });
  }

  @Query(() => Int, { name: 'postCount' })
  count() {
    return this.postService.count();
  }

  @Query(() => Post)
  getPostById(@Args('id', { type: () => Int }) id: number) {
    return this.postService.findOne(id);
  }

  @Query(() => [Post])
  @UseGuards(JwtAuthGuard)
  getUserPost(
    @Context() context,
    @Args('skip', { nullable: true, type: () => Int }) skip?: number,
    @Args('take', { nullable: true, type: () => Int }) take?: number,
  ) {
    const userId = context.req.user.id;

    return this.postService.findPostByUser({
      userId,
      skip: skip ?? 1,
      take: take ?? DEFAULT_PAGE_SIZE,
    });
  }

  @Query(() => Int)
  @UseGuards(JwtAuthGuard)
  userPostCount(@Context() context) {
    const userId = context.req.user.id;
    return this.postService.userPostCount(userId);
  }

  @Mutation(() => Post)
  @UseGuards(JwtAuthGuard)
  createPost(
    @Context() context,
    @Args('createPostInput') createPostInout: CreatePostInput,
  ) {
    const authorId = context.req.user.id;
    return this.postService.create(createPostInout, authorId);
  }

  @Mutation(() => Post)
  @UseGuards(JwtAuthGuard)
  updatePost(
    @Context() context,
    @Args('updatePostInput') updatePostInput: UpdatePostInput,
  ) {
    const authorId = context.req.user.id;
    return this.postService.update(updatePostInput, authorId);
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard)
  deletePost(
    @Context() context,
    @Args('postId', { type: () => Int }) postId: number,
  ) {
    const authorId = context.req.user.id;
    return this.postService.delete(postId, authorId);
  }
}
