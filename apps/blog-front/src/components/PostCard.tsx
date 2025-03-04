import type { Post } from '@/lib/types/modelTypes'
import React from 'react'
import Image from 'next/image';

type PostCardProps = Partial<Post>

const PostCard = ({ id, title, slug, thumbnail, content, createdAt }: PostCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-60">
        <Image src={thumbnail ?? '/no-image.ong'} alt={title ?? ""} fill />
      </div>
    </div>
  )
}

export default PostCard