import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function SignUpForm() {
  return (
    <div>
      <form className="space-y-4">
        {/* Username field */}
        <div>
          <Label className="text-lg">
            Username <span className="text-pink-500">*</span>
          </Label>
          <Input
            className="bg-gray-100 rounded-md placeholder-gray-400 p-6"
            placeholder="Enter your username"
          />
        </div>

        {/* Phone field */}
        <div>
          <Label className="text-lg">
            Phone Number <span className="text-pink-500">*</span>
          </Label>
          <Input
            className="bg-gray-100 rounded-md placeholder-gray-400 p-6"
            placeholder="Enter your phone number"
          />
        </div>

        {/* Password field */}
        <div>
          <Label className="text-lg">
            Password <span className="text-pink-500">*</span>
          </Label>
          <Input
            type="password"
            className="bg-gray-100 rounded-md placeholder-gray-400 p-6"
            placeholder="Your Password"
          />
        </div>

        {/* Confirm Password field */}
        <div>
          <Label className="text-lg">
            Confirm Password <span className="text-pink-500">*</span>
          </Label>
          <Input
            type="password"
            className="bg-gray-100 rounded-md placeholder-gray-400 p-6"
            placeholder="Confirm Your Password"
          />
        </div>

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
