import { fetchPostById } from "@/lib/actions/postActions";
import Image from "next/image";
import React from "react";
import SanitizedContent from "./_components/SanitizedContent";
import Comments from "./_components/Comments";

type PostPageProps = {
  params: { id: string };
};

const PostPage = async ({ params }: PostPageProps) => {
  const postId = (await params).id;
  const post = await fetchPostById(+postId);
  return (
    <main className='container mx-auto px-4 py-8 mt-16'>
      <h1 className='text-4xl font-bold mb-4 text-slate-700'>{post.title}</h1>
      <p className='text-slate-500 text-sm mb-4'>
        By {post.author.name} | {new Date(post.createdAt).toLocaleDateString()}
      </p>
      <div className='relative w-80 h-60'>
        <Image src={post.thumbnail ?? "/no-image.png"} alt={post.title} fill className='rounded-md object-cover' />
      </div>
      <SanitizedContent content={post.content} />
      <Comments postId={+postId}></Comments>
    </main>
  );
};

export default PostPage;
