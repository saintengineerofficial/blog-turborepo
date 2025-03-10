import { fetchPostById } from "@/lib/actions/postActions";
import UpdatePostContainer from "./_components/UpdatePostContainer";


type UpdatePostPageProps = {
  params: Promise<{ id: string; }>;
}

const UpdatePostPage = async (props: UpdatePostPageProps) => {
  const params = await props.params;
  const post = await fetchPostById(+params.id);
  return (
    <div className="bg-white shadow-md rounded-md p-6 max-w-2xl w-full">
      <h2 className="text-lg text-center font-bold text-slate-700">
        Update Post
      </h2>
      <UpdatePostContainer post={post} />
    </div>
  );
};

export default UpdatePostPage;


