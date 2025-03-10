import { z } from "zod";

export const PostFormSchema = z.object({
  postId: z
    .string()
    .transform(value => parseInt(value))
    .optional(),
  title: z.string().min(5).max(100),
  content: z.string().min(20),
  tags: z
    .string()
    .min(1)
    .refine(value => value.split(",").every(tag => tag.trim() !== ""))
    .transform(value => value.split(",")),
  thumbnail: z.instanceof(File).optional(),
  published: z.string().transform(value => value === "on"),
});
