"use client";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { PropsWithChildren, useEffect, useState } from "react";

const DesktopNavbar = (props: PropsWithChildren) => {

  const [scrollPosition, setScrollPosition] = useState(0)

  const handleScroll = () => {
    setScrollPosition(window.scrollY)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isScrollDown = scrollPosition > 10

  return (
    <nav className={cn('fixed w-full z-30 text-white top-0 hidden md:block bg-transparent transition-all duration-300', { 'bg-white text-gray-700 shadow-md': isScrollDown })}>
      <div className="container flex items-center px-4 py-4">
        {props.children}
      </div>
      <hr className="border-b border-gray-100 opacity-25 " />
    </nav>
  );
};

export default DesktopNavbar;
