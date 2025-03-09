"use client";
import { Button } from "@/components/ui/button";
import { getPostLike, likePost, unlikePost } from "@/lib/actions/like";
import { SessionUser } from "@/lib/session";
import { useMutation, useQuery } from "@tanstack/react-query";
import { HeartIcon, HeartOffIcon } from "lucide-react";
import React from "react";

type LikeProps = {
  postId: number;
  user?: SessionUser;
};

const Like = ({ postId }: LikeProps) => {
  const { data, refetch } = useQuery({ queryKey: ["GET_POST_LIKE", postId], queryFn: async () => await getPostLike({ postId }) });

  const likePostMutation = useMutation({ mutationFn: async () => await likePost({ postId }), onSuccess: () => refetch() });
  const unlikePostMutation = useMutation({ mutationFn: async () => await unlikePost({ postId }), onSuccess: () => refetch() });

  return (
    <div className='mt-3 flex items-center justify-start gap-2'>
      {data?.userLikePost ? (
        <Button variant='outline' onClick={() => unlikePostMutation.mutate()}>
          <HeartIcon className='w-6 text-rose-600' />
        </Button>
      ) : (
        <Button variant='outline' onClick={() => likePostMutation.mutate()}>
          <HeartOffIcon className='w-6' />
        </Button>
      )}
      <p className='text-slate-600'>{data?.postLikeCount}</p>
    </div>
  );
};

export default Like;
