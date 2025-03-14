import { FriendsList } from "./components/friends-list";

export const metadata: Metadata = {
  title: "Friends",
  description: "Manage your friends and chat",
};

export default function FriendsPage() {
  return (
    <div className="container relative min-h-screen py-8">
      <div className="mx-auto flex w-full flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">Friends</h1>
          <p className="text-sm text-muted-foreground">
            Connect and chat with your friends
          </p>
        </div>
        <FriendsList />
      </div>
    </div>
  );
}
