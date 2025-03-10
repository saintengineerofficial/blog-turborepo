import React from 'react'
import Link from 'next/link';
import { getSession } from '@/lib/session';
import SignInPanel from './SignInPanel';
import Profile from './Profile';

const Navbar = async () => {

  const session = await getSession()

  return (
    <>
      <h1 className="text-2xl font-bold p-2"></h1>
      <div className="md:ml-auto  px-2 flex flex-col md:flex-row gap-2 md:items-center md:justify-center
      [&>a:hover]:bg-sky-500 [&>a:hover]:text-sky-100 [&>a]:rounded-md [&>a]:transition [&>a]:duration-200 [&>a]:px-4 md:[&>a]:py-2 [&>a]:py-1 ">
        <Link href="/">Blog</Link>
        <Link href="#about">About</Link>
        <Link href="#contact">Contact</Link>
        {session && session.user ? (
          <Profile user={session.user} />
        ) : (
          <SignInPanel />
        )}
      </div>
    </>
  )
}

export default Navbar