import { Post } from "@/lib/types/modelTypes";
import React from "react";
import PostListItem from "./PostListItem";

type PostListProps = {
  currentPage: number;
  total: number;
  posts: Post[];
};

const PostList = ({ currentPage, total, posts }: PostListProps) => {
  return (
    <>
      <div className='grid grid-cols-8 rounded-md shadow-md m-3 p-3 text-center'>
        <div className='col-span-2'></div>
        <div></div>
        <div>Date</div>
        <div>Published</div>
        <div>Likes</div>
        <div>Comments</div>
        <div></div>
      </div>

      {posts.map(post => (
        <PostListItem post={post} key={post.id} />
      ))}
    </>
  );
};

export default PostList;
