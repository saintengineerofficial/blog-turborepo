import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { PencilIcon, TrashIcon } from "lucide-react";
import Link from "next/link";

type Props = {
  postId: number;
};
const PostActions = ({ postId }: Props) => {
  return (
    <div className='flex justify-center items-center gap-2'>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link className='border p-2 border-yellow-500 rounded-md text-yellow-500 hover:border-yellow-700  hover:text-yellow-700 transition-colors' href={`/user/posts/${postId}/update`}>
              <PencilIcon className='w-4' />
            </Link>
          </TooltipTrigger>
          <TooltipContent className='bg-yellow-700 text-white'>
            <p>Edit This Post</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link className='border p-2 border-red-500 rounded-md text-red-500 hover:border-red-700  hover:text-red-700 transition-colors' href={`/user/posts/${postId}/delete`}>
              <TrashIcon className='w-4' />
            </Link>
          </TooltipTrigger>
          <TooltipContent className='bg-red-500 text-white'>
            <p>Delete This Post</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default PostActions;
