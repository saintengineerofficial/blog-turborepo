import Hero from "@/components/Hero";
import Navbar from '../components/Navbar';
import NavbarContainer from "@/components/NavbarContainer";
import Posts from "@/components/Posts";
import { fetchPosts } from "@/lib/actions/postActions";

const Home = async () => {

  const posts = await fetchPosts()

  return (
    <main>
      <NavbarContainer>
        <Navbar></Navbar>
      </NavbarContainer>

      <Hero></Hero>
      <Posts posts={[]} currentPage={0} totalPages={10}></Posts>
    </main>
  );
}

export default Home