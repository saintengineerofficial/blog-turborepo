import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateCommentInput {
  @Field(() => Int)
  @IsNumber()
  postId: number;

  @Field()
  @IsString()
  content: string;
}
