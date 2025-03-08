import type { SessionUser } from "@/lib/session";
import React, { useActionState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import SubmitButton from "@/components/SubmitButton";
import { cn } from "@/lib/utils";
import { saveComment } from "@/lib/actions/commentActions";
import { toast } from "sonner";
import { CommentEntity } from "@/lib/types/modelTypes";
import { RefetchOptions, QueryObserverResult } from "@tanstack/react-query";

type AddCommentProps = {
  postId: number;
  user: SessionUser;
  className?: string;
  refetch: (options?: RefetchOptions) => Promise<
    QueryObserverResult<
      {
        comments: CommentEntity[];
        count: number;
      },
      Error
    >
  >;
};

const AddComment = (props: AddCommentProps) => {
  const [state, action] = useActionState(saveComment, undefined);

  useEffect(() => {
    if (state?.message)
      toast(state?.ok ? "Success" : "Oops!", {
        description: state?.message,
      });
    if (state?.ok) props.refetch();
  }, [state]);

  return (
    <Dialog open={state?.open}>
      <DialogTrigger asChild>
        <Button>Leave Your Comment</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Write Your Comment</DialogTitle>
        <form action={action} className={cn(props.className)}>
          <input hidden name='postId' defaultValue={props.postId} />
          <Label htmlFor='comment'>Your Comment</Label>
          <div className='border-t border-x rounded-t-md'>
            <Textarea className='border-none active:outline-none focus-visible:ring-0 shadow-none' name='content' />
            {!!state?.errors?.content && <p className='text-red-500 animate-shake'>{state.errors.content}</p>}
          </div>
          <p className='border rounded-b-md p-2'>
            <span className='text-slate-400'>Write as </span>
            <span className='text-slate-700'>{props.user.name}</span>
          </p>
          <SubmitButton className='mt-2'>Submit</SubmitButton>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddComment;
