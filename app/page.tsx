import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Onboarding",
  description: "Tell us about yourself",
};

export default function OnboardingPage() {
  return (
    <div className="container relative min-h-screen py-8">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[550px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome to Welkom!
          </h1>
          <p className="text-sm text-muted-foreground">
            Help us personalize your experience by answering a few questions
          </p>

          <Button asChild>
            <Link href={"/sign-in"}>Sign in</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
