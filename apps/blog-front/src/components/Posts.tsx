import type { Post } from "@/lib/types/modelTypes";
import React from "react";
import PostCard from "./PostCard";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

type PostsProps = {
  posts: Post[];
  currentPage: number;
  total: number;
};

const Posts = ({ posts, currentPage, total }: PostsProps) => {
  return (
    <section className='container m-8 max-w-5xl mx-auto'>
      <h2 className='text-5xl font-bold text-center text-gray-600  leading-tight'>Latest Posts</h2>
      <div className='h-1 mx-auto bg-gradient-to-r from-sky-500 to-indigo-500 w-96 mb-9 rounded-t-md mt-5'></div>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        {posts.map(post => (
          <PostCard key={post.id} {...post} />
        ))}
      </div>
      <Pagination className='mt-10'>
        <PaginationContent>
          {currentPage - 1 > 0 && (
            <PaginationItem>
              <PaginationPrevious href={`?pageNum=${currentPage - 1}`} />
            </PaginationItem>
          )}
          {(currentPage === 1 || currentPage > 5) && (
            <PaginationItem>
              <PaginationLink href={`?pageNum=${1}`} isActive>
                1
              </PaginationLink>
            </PaginationItem>
          )}
          {currentPage > 5 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          {currentPage - 1 > 0 && (
            <PaginationItem>
              <PaginationLink href={`?pageNum=${currentPage - 1}`}>{currentPage - 1}</PaginationLink>
            </PaginationItem>
          )}

          {currentPage > 1 && (
            <PaginationItem>
              <PaginationLink href={`?pageNum=${currentPage}`} isActive>
                {currentPage}
              </PaginationLink>
            </PaginationItem>
          )}
          {currentPage + 1 < total && (
            <>
              <PaginationItem>
                <PaginationLink href={`?pageNum=${currentPage + 1}`}>{currentPage + 1}</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href={`?pageNum=${total}`}>{total}</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href={`?pageNum=${currentPage + 1}`} />
              </PaginationItem>
            </>
          )}
        </PaginationContent>
      </Pagination>
    </section>
  );
};

export default Posts;
