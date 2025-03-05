import Link from "next/link";
import React from "react";
import SignInForm from "./_components/SignInForm";

const SignInPage = () => {
  return (
    <div className='bg-white p-8 rounded-md shadow-md w-96 flex flex-col justify-center items-center'>
      <h2 className='text-center text-2xl font-bold mb-4'>Sign In Page</h2>
      <SignInForm />
      <div>
        <p>Already have an account?</p>
        <Link className='underline' href={"/auth/signup"}>
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default SignInPage;
