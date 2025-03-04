import Hero from "@/components/Hero";

import Posts from "@/components/Posts";
import { fetchPosts } from "@/lib/actions/postActions";
import { DEFAULT_PAGE_SIZE } from "@/lib/constants";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const Home = async ({ searchParams }: Props) => {
  const { pageNum } = await searchParams;
  const { data: posts, total } = await fetchPosts({ pageNum: pageNum ? +pageNum : undefined });

  return (
    <main>
      <Hero></Hero>
      <Posts posts={posts} currentPage={pageNum ? +pageNum : 1} total={Math.ceil(total / DEFAULT_PAGE_SIZE)}></Posts>
    </main>
  );
};

export default Home;
