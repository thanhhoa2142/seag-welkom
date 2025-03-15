import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { login, signup } from "@/app/actions/auth";
import { Label } from "@/components/ui/label";

export function SignInForm() {
  return (
    <form className="space-y-4">
      <div className="space-y-2">
        <Label>Username or Phone</Label>
        <Input placeholder="Enter your username or phone" name="username" />
      </div>
      <div className="space-y-2">
        <Label>Password</Label>
        <Input
          type="password"
          placeholder="Enter your password"
          name="password"
        />
      </div>
      <div>
        <Button formAction={login} className="w-full">
          Sign in
        </Button>
        <Button variant={"secondary"} formAction={signup} className="w-full">
          Sign up
        </Button>
      </div>
    </form>
  );
}
