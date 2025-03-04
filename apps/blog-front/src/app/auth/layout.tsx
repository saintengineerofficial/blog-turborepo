import React, { PropsWithChildren } from "react";

function Layout({ children }: PropsWithChildren) {
  return <div className='min-h-screen flex items-center justify-center bg-slate-100'>{children}</div>;
}

export default Layout;
