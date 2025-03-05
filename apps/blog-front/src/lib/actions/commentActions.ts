"use server";

import { fetchGraphQL } from "../fetchGraphQL";
import { print } from "graphql";
import { GET_POST_COMMENTS } from "../gqlQueries";
import { CommentEntity } from "../types/modelTypes";

export async function getPostComments({ postId, take, skip }: { postId: number; take?: number; skip?: number }) {
  const data = await fetchGraphQL(print(GET_POST_COMMENTS), { postId, skip, take });
  return {
    comments: data.getPostComments as CommentEntity[],
    count: data.postCommentCount as number,
  };
}
