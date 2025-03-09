"use server";

import { authFetchGraphQL } from "../fetchGraphQL";
import { print } from "graphql";
import { GET_POST_LIKE, MUTATION_LIKE_POST, MUTATION_UNLIKE_POST } from "../gqlQueries";

export async function getPostLike({ postId }: { postId: number }) {
  const data = await authFetchGraphQL(print(GET_POST_LIKE), { postId });
  return {
    postLikeCount: data.postLikeCount as number,
    userLikePost: data.userLikePost as boolean,
  };
}

export async function likePost({ postId }: { postId: number }) {
  await authFetchGraphQL(print(MUTATION_LIKE_POST), { postId });
}

export async function unlikePost({ postId }: { postId: number }) {
  await authFetchGraphQL(print(MUTATION_UNLIKE_POST), { postId });
}
