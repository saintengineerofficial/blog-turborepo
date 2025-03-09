import { DEFAULT_PAGE_SIZE } from "@/lib/constants";
import React from "react";
import NoPost from "./_components/NoPost";
import PostList from "./_components/PostList";
import { fetchUserPosts } from "@/lib/actions/postActions";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const Page = async ({ searchParams }: Props) => {
  const { page } = await searchParams;

  const { totalPosts: total, posts } = await fetchUserPosts({
    pageNum: page ? +page : 1,
    pageSize: DEFAULT_PAGE_SIZE,
  });

  return <div>{!posts || !posts.length ? <NoPost /> : <PostList posts={posts} currentPage={page ? +page : 1} total={Math.ceil(total / DEFAULT_PAGE_SIZE)} />}</div>;
};

export default Page;
