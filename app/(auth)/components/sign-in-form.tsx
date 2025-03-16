import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { login } from "@/app/actions/auth";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export function SignInForm() {
  return (
    <div className="max-w-md ">
      <form className="space-y-4">
        <div className="space-y-2">
          <Label className="text-gray-700 text-lg font-bold">
            Username <span className="text-red-500">*</span>
          </Label>
          <Input
            className="bg-gray-100 rounded-md placeholder-gray-400 p-6"
            placeholder="Username..."
            name="username"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-gray-700 text-lg font-bold">
            Password <span className="text-red-500">*</span>
          </Label>
          <Input
            type="password"
            className="bg-gray-100 rounded-md placeholder-gray-400 p-6"
            placeholder="Your Password"
            name="password"
          />
        </div>

        {/* Login button */}
        <Link href={"/preference"}>
          <Button
            formAction={login}
            className="w-full bg-green-700 text-gray-200 rounded-md font-bold p-6"
          >
            Sign in
          </Button>
        </Link>
      </form>

      <p className="text-black text-lg text-center mt-4">
        Don’t have an account?
        <Link
          href="/sign-up"
          className="underline ml-2 text-green-700 font-bold text-lg"
        >
          Sign Up
        </Link>
      </p>
    </div>
  );
}
