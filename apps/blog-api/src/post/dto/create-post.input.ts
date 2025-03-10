import { InputType, Int, Field } from '@nestjs/graphql';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreatePostInput {
  @IsString()
  @Field()
  title: string;
  @IsString()
  @Field()
  content: string;
  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  thumbnail: string;

  @IsString({ each: true })
  @Field(() => [String])
  tags: string[];

  @IsBoolean()
  @Field(() => Boolean)
  published: boolean;
}
