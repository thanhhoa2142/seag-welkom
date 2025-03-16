import { Button } from "@/components/ui/button";
import Link from "next/link";
import { QrCode } from "lucide-react";
import FriendsList from "./components/friends-list";

export const metadata: Metadata = {
  title: "Friends",
  description: "Manage your friends and chat",
};

export default function FriendsPage() {
  return (
    <div className="space-y-6">
      <header>
        <div className="flex justify-between items-end gap-2 mb-2">
          <h1 className="text-2xl font-semibold tracking-tight">Friends</h1>

          <Button asChild>
            <Link href="/friend-suggestions">
              <QrCode className="h-4 w-4" /> Add friend
            </Link>
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          This Is Private Message, Between You And Buddy. This Chat Is End To
          End Encrypted...
        </p>
      </header>

      <FriendsList />
    </div>
  );
}
