import React, { PropsWithChildren } from "react";

const layout = ({ children }: PropsWithChildren) => {
  return <div className='mt-24 flex flex-col justify-center items-center'>{children}</div>;
};

export default layout;
