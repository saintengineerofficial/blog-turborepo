"use server";

import { fetchGraphQL } from "../fetchGraphQL";
import { GET_POSTS } from "../gqlQueries";
import { print } from "graphql";
import type { Post } from "../types/modelTypes";

export const fetchPosts = async () => {
  const data = await fetchGraphQL(print(GET_POSTS));
  return data.posts as Post[];
};
