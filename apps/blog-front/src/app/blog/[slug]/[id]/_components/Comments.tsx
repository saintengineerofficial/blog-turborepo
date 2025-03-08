"use client";
import React, { useState } from "react";
import { DEFAULT_PAGE_SIZE } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";
import { getPostComments } from "@/lib/actions/commentActions";
import CommentCard from "./CommentCard";
import CommentPagination from "./CommentPagination";
import CommentCardSkeleton from "./CommentCardSkeleton";
import type { SessionUser } from "@/lib/session";
import AddComment from "./AddComment";

type CommentsProps = {
  postId: number;
  user?: SessionUser;
};

const Comments = ({ postId, user }: CommentsProps) => {
  const [pageNum, setPageNum] = useState(1);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["GET_POST_COMMENTS", postId, pageNum],
    queryFn: async () =>
      await getPostComments({
        postId,
        skip: pageNum * DEFAULT_PAGE_SIZE,
        take: DEFAULT_PAGE_SIZE,
      }),
  });
  const totalPages = Math.ceil((data?.count ?? 0) / DEFAULT_PAGE_SIZE);
  return (
    <div className='p-2 rounded-md shadow-md'>
      <button onClick={() => refetch()}></button>
      <h6 className='text-lg text-slate-700 '>Comments</h6>
      {!!user && <AddComment postId={postId} user={user} refetch={refetch} />}
      <div className='flex flex-col gap-4'>
        {isLoading ? Array.from({ length: 12 }).map((_, index) => <CommentCardSkeleton key={index} />) : data?.comments.map(comment => <CommentCard key={comment.id} comment={comment} />)}
      </div>

      <CommentPagination className='p-2' currentPage={pageNum} setCurrentPage={(p: number) => setPageNum(p)} totalPages={totalPages} />
    </div>
  );
};

export default Comments;
