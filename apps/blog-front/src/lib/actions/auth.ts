"use server";

import { redirect } from "next/navigation";
import { fetchGraphQL } from "../fetchGraphQL";
import { CREATE_USER_MUTATION, SIGN_IN_MUTATION } from "../gqlQueries";
import { SignUpFormState } from "../types/formState";
import { SignUpFormSchema } from "../zodSchemas/signUpFormSchema";
import { print } from "graphql";
import { LoginFormSchema } from "../zodSchemas/loginFormSchema";
import { revalidatePath } from "next/cache";

export const signUp = async (state: SignUpFormState, formData: FormData): Promise<SignUpFormState> => {
  const validateFields = SignUpFormSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validateFields.success) {
    return {
      data: Object.fromEntries(formData.entries()),
      errors: validateFields.error?.flatten().fieldErrors,
    };
  }

  const data = await fetchGraphQL(print(CREATE_USER_MUTATION), { input: { ...validateFields.data } });

  if (data.errors)
    return {
      data: Object.fromEntries(formData.entries()),
      message: "Error creating",
    };

  redirect("/auth/signIn");
};

export const signIn = async (state: SignUpFormState, formData: FormData): Promise<SignUpFormState> => {
  const validateFields = LoginFormSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validateFields.success) {
    return {
      data: Object.fromEntries(formData.entries()),
      errors: validateFields.error?.flatten().fieldErrors,
    };
  }

  const data = await fetchGraphQL(print(SIGN_IN_MUTATION), { input: { ...validateFields.data } });

  if (data.errors)
    return {
      data: Object.fromEntries(formData.entries()),
      message: "Invalid Credentials",
    };

  revalidatePath("/");
  redirect("/");
};
