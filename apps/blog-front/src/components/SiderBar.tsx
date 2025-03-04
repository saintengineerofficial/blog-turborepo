"use client";

import { cn } from "@/lib/utils";
import { PropsWithChildren, ReactNode, useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";

type SideBarProps = PropsWithChildren<{
  triggerIcon: ReactNode;
  triggerClassName?: string;
}>;
const SideBar = (props: SideBarProps) => {
  const [isShow, setIsShow] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useOnClickOutside(ref, () => setIsShow(false));

  return (
    <>
      <button
        className={props.triggerClassName}
        onClick={() => setIsShow((prev) => !prev)}
      >
        {props.triggerIcon}
      </button>
      <div
        ref={ref}
        className={cn(
          "w-60 absolute top-0 z-50 duration-300  transition-all bg-white rounded-r-md min-h-screen",
          {
            "-left-full": !isShow,
            "left-0": isShow,
          }
        )}
      >
        {props.children}
      </div>
    </>
  );
};

export default SideBar;
