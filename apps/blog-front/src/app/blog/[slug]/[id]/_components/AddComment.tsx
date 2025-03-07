import type { SessionUser } from '@/lib/session';
import React, { useActionState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from '@/components/ui/button';
import SubmitButton from '@/components/SubmitButton';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { saveComment } from '@/lib/actions/commentActions';

type AddCommentProps = {
  postId: number;
  user: SessionUser;
  className?: string;
}

const AddComment = (props: AddCommentProps) => {

  const [state, action] = useActionState(saveComment, undefined)

  return <Dialog open={state?.open}>
    <DialogTrigger asChild>
      <Button>Leave Your Comment</Button>
    </DialogTrigger>
    <DialogContent>
      <DialogTitle>Write Your Comment</DialogTitle>
      <form action={action} className={cn(props.className)}>
        <Input hidden name="postId" defaultValue={props.postId} />
        <Label htmlFor="comment">Your Comment</Label>
        <div className="border-t border-x rounded-t-md">
          <Textarea
            className="border-none active:outline-none focus-visible:ring-0 shadow-none"
            name="content"
          />
          {!!state?.errors?.content && (
            <p className="text-red-500 animate-shake">
              {state.errors.content}
            </p>
          )}
        </div>
        <p className="border rounded-b-md p-2">
          <span className="text-slate-400">Write as </span>
          <span className="text-slate-700">{props.user.name}</span>
        </p>
        <SubmitButton className="mt-2">Submit</SubmitButton>
      </form>
    </DialogContent>
  </Dialog>
}

export default AddComment