import { Button } from "@/components/ui/button";
import { FriendsList } from "./components/friends-list";
import Link from "next/link";
import { QrCode } from "lucide-react";

export const metadata: Metadata = {
  title: "Friends",
  description: "Manage your friends and chat",
};

export default function FriendsPage() {
  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between gap-4">
        <div className="flex flex-col">
          <h1 className="text-2xl font-semibold tracking-tight">Friends</h1>
          <p className="text-sm text-muted-foreground">
            Connect & chat with your friends
          </p>
        </div>
        <Button variant={"outline"} size={"icon"} asChild>
          <Link href="/friend-suggestions">
            <QrCode className="h-4 w-4" />
          </Link>
        </Button>
      </header>
      <FriendsList />
    </div>
  );
}
