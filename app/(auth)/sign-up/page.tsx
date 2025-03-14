import { Metadata } from "next";
import { SignUpForm } from "../components/sign-up-form";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create a new account",
};

export default function SignUpPage() {
  return (
    <>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Create an account
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your details to create your account
        </p>
      </div>
      <SignUpForm />
    </>
  );
}
