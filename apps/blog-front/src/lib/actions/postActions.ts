"use server";

import { authFetchGraphQL, fetchGraphQL } from "../fetchGraphQL";
import { GET_POST_BY_ID, GET_POSTS, GET_USER_POST } from "../gqlQueries";
import { print } from "graphql";
import { Post } from "../types/modelTypes";
import { transformTakeSkip } from "../helpers";

export const fetchPosts = async ({ pageNum, pageSize }: { pageNum?: number; pageSize?: number }) => {
  const { skip, take } = transformTakeSkip({ pageNum, pageSize });
  const data = await fetchGraphQL(print(GET_POSTS), { skip, take });
  return {
    code: 200,
    data: data.posts as Post[],
    total: data.postCount,
  };
};

export const fetchPostById = async (id: number) => {
  const data = await fetchGraphQL(print(GET_POST_BY_ID), { id });
  return data.getPostById as Post;
};

export async function fetchUserPosts({ pageNum, pageSize }: { pageNum?: number; pageSize: number }) {
  const { take, skip } = transformTakeSkip({ pageNum, pageSize });
  const data = await authFetchGraphQL(print(GET_USER_POST), { take, skip });

  return {
    posts: data.getUserPost as Post[],
    totalPosts: data.userPostCount as number,
  };
}
