"use server";

import { authFetchGraphQL, fetchGraphQL } from "../fetchGraphQL";
import { CREATE_POST_MUTATION, DELETE_POST_MUTATION, GET_POST_BY_ID, GET_POSTS, GET_USER_POST, UPDATE_POST_MUTATION } from "../gqlQueries";
import { print } from "graphql";
import { Post } from "../types/modelTypes";
import { transformTakeSkip } from "../helpers";
import type { PostFormState } from "../types/formState";
import { PostFormSchema } from "../zodSchemas/postFormSchema";
import { uploadThumbnail } from "../upload";

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

export async function saveNewPost(state: PostFormState, formData: FormData): Promise<PostFormState> {
  const validateFields = PostFormSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validateFields.success) {
    return {
      data: Object.fromEntries(formData.entries()),
      errors: validateFields.error?.flatten().fieldErrors,
    };
  }

  let thumbnail = "";

  if (validateFields.data.thumbnail) {
    thumbnail = await uploadThumbnail(validateFields.data.thumbnail);
  }

  const data = await authFetchGraphQL(print(CREATE_POST_MUTATION), { input: { ...validateFields.data, thumbnail } });

  if (data) return { message: "Success! New Post Saved", ok: true };

  return {
    message: "Oops, Something Went Wrong",
    data: Object.fromEntries(formData.entries()),
  };
}

export async function updatePost(state: PostFormState, formData: FormData): Promise<PostFormState> {
  const validatedFields = PostFormSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return {
      data: Object.fromEntries(formData.entries()),
      errors: validatedFields.error?.flatten().fieldErrors,
    };
  }
  const { thumbnail, ...inputs } = validatedFields.data;

  let thumbnailUrl = "";

  if (thumbnail) {
    thumbnailUrl = await uploadThumbnail(thumbnail);
  }

  const data = await authFetchGraphQL(print(UPDATE_POST_MUTATION), {
    input: {
      ...inputs,
      ...(thumbnailUrl && { thumbnail: thumbnailUrl }),
    },
  });

  if (data) return { message: "Success! The Post Updated", ok: true };

  return {
    message: "Oops, Something Went Wrong",
    data: Object.fromEntries(formData.entries()),
  };
}

export async function deletePost(postId: number) {
  const data = await authFetchGraphQL(print(DELETE_POST_MUTATION), { postId });

  console.log("🚀 ~ deletePost ~ data:", data);

  return data.deletePost;
}
