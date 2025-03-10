import { PropsWithChildren, ReactNode } from "react";

type Props = PropsWithChildren<{
  modal: ReactNode;
}>;
const PostsLayout = ({ children, modal }: Props) => {
  return (
    <>
      {children}
      {modal}
    </>
  );
};

export default PostsLayout;