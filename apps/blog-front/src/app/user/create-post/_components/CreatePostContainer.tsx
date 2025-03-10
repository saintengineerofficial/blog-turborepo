'use client'
import React, { useActionState } from 'react'
import UpsertPostForm from './UpsertPostForm'
import { saveNewPost } from '@/lib/actions/postActions'


const CreatePostContainer = () => {
  const [state, action] = useActionState(saveNewPost, undefined)
  return <UpsertPostForm state={state} action={action} />;
}

export default CreatePostContainer