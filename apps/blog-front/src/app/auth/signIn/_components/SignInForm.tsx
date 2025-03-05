'use client'
import SubmitButton from "@/components/SubmitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "@/lib/actions/auth";
import { useActionState } from "react";

const SignInForm = () => {
  const [state, action] = useActionState(signIn, undefined)
  return (
    <form action={action} className="flex flex-col gap-2">
      {!!state?.message && <p className="text-red-500 text-sm">{state.message}</p>}

      <div>
        <Label defaultValue={state?.data.email} htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type='email'
          placeholder="xxx@example.com"
        />
      </div>
      {!!state?.errors?.email && (<p className="text-red-500 text-sm">{state.errors.email}</p>)}

      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          defaultValue={state?.data.password}
        />
      </div>
      {!!state?.errors?.password && (<p className="text-red-500 text-sm">{state.errors.password}</p>)}


      <SubmitButton>Sign In</SubmitButton>
    </form>
  );
};

export default SignInForm;
