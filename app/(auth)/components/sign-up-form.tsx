import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export function SignUpForm() {
  return (
    <div>
      <form className="space-y-4">
        {/* Username field */}
        <FormItem>
          <FormLabel className="text-lg">
            Username <span className="text-pink-500">*</span>
          </FormLabel>
          <Input
            className="bg-gray-100 rounded-md placeholder-gray-400 p-6"
            placeholder="Enter your username"
          />
        </FormItem>

        {/* Phone field */}
        <FormItem>
          <FormLabel className="text-lg">
            Phone Number <span className="text-pink-500">*</span>
          </FormLabel>
          <Input
            className="bg-gray-100 rounded-md placeholder-gray-400 p-6"
            placeholder="Enter your phone number"
          />
        </FormItem>

        {/* Password field */}
        <FormItem>
          <FormLabel className="text-lg">
            Password <span className="text-pink-500">*</span>
          </FormLabel>
          <Input
            type="password"
            className="bg-gray-100 rounded-md placeholder-gray-400 p-6"
            placeholder="Your Password"
          />
        </FormItem>

        {/* Confirm Password field */}
        <FormItem>
          <FormLabel className="text-lg">
            Confirm Password <span className="text-pink-500">*</span>
          </FormLabel>
          <Input
            type="password"
            className="bg-gray-100 rounded-md placeholder-gray-400 p-6"
            placeholder="Confirm Your Password"
          />
        </FormItem>

        {/* Submit button */}
        <Button
          className="w-full bg-green-800 text-white font-bold rounded-md p-6"
          asChild
        >
          <Link href="/sign-in">Sign Up</Link>
        </Button>
      </form>

      <p className="text-black text-center mt-4">
        Already have an account?
        <Link
          href="/sign-in"
          className="underline text-green-700 font-semibold ml-2"
        >
          Sign In
        </Link>
      </p>
    </div>
  );
}
