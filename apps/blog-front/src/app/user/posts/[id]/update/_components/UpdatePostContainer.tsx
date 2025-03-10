'use client'
import React, { useActionState } from 'react'
import { updatePost } from '@/lib/actions/postActions'
import UpsertPostForm from '@/app/user/create-post/_components/UpsertPostForm'
import type { Post } from '@/lib/types/modelTypes'

type UpdatePostContainerProps = {
  post: Post
}

const UpdatePostContainer = ({ post }: UpdatePostContainerProps) => {
  const [state, action] = useActionState(updatePost, {
    data: {
      postId: post.id,
      title: post.title,
      content: post.content,
      published: post.published ? "on" : undefined,
      tags: post.tags?.map((tag) => tag.name).join(","),
      previousThumbnailUrl: post.thumbnail ?? undefined,
    }
  })
  return <UpsertPostForm state={state} action={action} />;
}

export default UpdatePostContainer