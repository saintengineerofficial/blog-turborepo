import { Post } from "@/lib/types/modelTypes";
import { CheckIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import PostActions from "./PostActions";

type PostListItemProps = {
  post: Post;
};

const PostListItem = ({ post }: PostListItemProps) => {
  return (
    <div className='grid grid-cols-8 m-2 rounded-md overflow-hidden border shadow hover:scale-[101%] cursor-pointer transition text-center bg-white'>
      <div className='relative w-48 h-32'>
        <Image src={post.thumbnail || "/no-image.png"} alt={post.title} fill />
      </div>
      <div className='flex flex-col gap-2 col-span-2'>
        <p className='text-lg line-clamp-1 px-2 text-slate-700'>{post.title}</p>
        <p className='text-sm line-clamp-3 px-1  text-slate-500'>{post.content}</p>
      </div>

      <p className='flex justify-center items-center'>{new Date(post.createdAt).toLocaleDateString()}</p>
      <div className='flex justify-center items-center'>{post.published && <CheckIcon className='w-5' />}</div>
      <div className='flex justify-center items-center'>{post._count.likes}</div>

      <div className='flex justify-center items-center'>{post._count.comments}</div>

      <PostActions postId={post.id} />
    </div>
  );
};

export default PostListItem;
