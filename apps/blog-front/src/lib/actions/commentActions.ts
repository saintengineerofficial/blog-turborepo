"use server";

import { authFetchGraphQL, fetchGraphQL } from "../fetchGraphQL";
import { print } from "graphql";
import { CREATE_COMMENT_MUTATION, GET_POST_COMMENTS } from "../gqlQueries";
import { CommentEntity } from "../types/modelTypes";
import { CreateCommentFormState } from "../types/formState";
import { CommentFormSchema } from "../zodSchemas/commentFormSchema";

export async function getPostComments({ postId, take, skip }: { postId: number; take?: number; skip?: number }) {
  const data = await fetchGraphQL(print(GET_POST_COMMENTS), { postId, skip, take });
  return {
    comments: data.getPostComments as CommentEntity[],
    count: data.postCommentCount as number,
  };
}

export async function saveComment(state: CreateCommentFormState, formData: FormData) {
  const validateFields = CommentFormSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!validateFields.success) {
    return {
      data: Object.fromEntries(formData.entries()),
      errors: validateFields.error.flatten().fieldErrors,
    };
  }

  const data = await authFetchGraphQL(print(CREATE_COMMENT_MUTATION), { input: { ...validateFields.data } });
  if (data)
    return {
      message: "Success! Your comment saved!",
      ok: true,
      open: false,
    };

  return {
    message: "Oops! Something went wrong!",
    ok: false,
    open: true,
    data: Object.fromEntries(formData.entries()),
  };
}
