import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import { BACKEND_URL } from "@/lib/constants";
import SignInForm from "./_components/SignInForm";

const SignInPage = () => {
  return (
    <div className=' bg-white p-8 border rounded-md gap-3 shadow-md w-96 flex flex-col justify-center items-center'>
      <h1 className='text-center text-2xl font-bold mb-4'>Sign In Page</h1>
      <SignInForm />
      <Link href={"/auth/forgot"}>Forgot Your Password?</Link>
      <Button>
        <a href={`${BACKEND_URL}/auth/google/login`}>Sign In With Google</a>
      </Button>
    </div>
  );
};

export default SignInPage;
