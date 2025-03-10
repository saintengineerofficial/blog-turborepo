'use client'

import SubmitButton from '@/components/SubmitButton'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import type { PostFormState } from '@/lib/types/formState'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

type UpsertPostFormProps = {
  state: PostFormState,
  action: (payload: FormData) => void;
}

const UpsertPostForm = ({ state, action }: UpsertPostFormProps) => {

  const [imageUrl, setImageUrl] = useState('')

  useEffect(() => {
    if (state?.message)
      toast(state?.ok ? "Success" : "Oops", {
        description: state?.message,
      });
  }, [state]);

  return (
    <form action={action} className="flex flex-col gap-5 [&>div>label]:text-slate-500 [&>div>input]:transition [&>div>textarea]:transition">
      <input hidden name="postId" defaultValue={state?.data?.postId} />
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          name="title"
          placeholder="Enter The Title of Your Post"
          defaultValue={state?.data?.title}
        />
      </div>
      {!!state?.errors?.title && (<p className="text-red-500 text-sm animate-shake">{state.errors.title}</p>)}

      <div>
        <Label htmlFor="content">Content</Label>
        <Textarea
          name="content"
          placeholder="Write Your Post Content Here"
          rows={6}
          defaultValue={state?.data?.content}
        />
      </div>
      {!!state?.errors?.content && (<p className="text-red-500 text-sm animate-shake">{state.errors.content}</p>)}

      <div>
        <Label htmlFor="thumbnail">Thumbnail</Label>
        <Input
          type="file"
          name="thumbnail"
          accept="image/*"
          onChange={(e) => {
            console.log("🚀 ~ UpsertPostForm ~ e.target.file:", e.target.files)
            if (e.target.files)
              setImageUrl(URL.createObjectURL(e.target.files[0]));
          }}
        />
        {(!!imageUrl || !!state?.data?.previousThumbnailUrl) && (
          <Image
            src={(imageUrl || state?.data?.previousThumbnailUrl) ?? ""}
            alt="post thumbnail"
            width={200}
            height={150}
          />
        )}
      </div>
      {!!state?.errors?.thumbnail && (
        <p className="text-red-500 animate-shake">{state.errors.thumbnail}</p>
      )}

      <div>
        <Label htmlFor="tags">Tags (comma-separated)</Label>
        <Input
          name="tags"
          placeholder="Enter tags (comma-separated)"
          defaultValue={state?.data?.tags}
        />
      </div>
      {!!state?.errors?.tags && (
        <p className="text-red-500 animate-shake">{state.errors.tags}</p>
      )}

      <div className="flex items-center">
        <input
          className="mx-2 w-4 h-4"
          type="checkbox"
          name="published"
          defaultChecked={state?.data?.published === "on" ? true : false}
        />
        <Label htmlFor="published">Published Now</Label>
      </div>
      {!!state?.errors?.isPublished && (
        <p className="text-red-500 animate-shake">{state.errors.isPublished}</p>
      )}

      <SubmitButton>Save</SubmitButton>
    </form>
  )
}

export default UpsertPostForm