import { z } from "zod";

export const CommentFormSchema = z.object({
  content: z.string().min(5),
  postId: z
    .string()
    .transform(val => parseInt(val))
    .refine(val => !isNaN(val)),
});
