import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, Search } from "lucide-react";
import { prisma } from "@/lib/db";
import Link from "next/link";

export async function FriendsList() {
  const user = await prisma.user.findFirst({ where: { username: "rinx1000" } });
  const connections = await prisma.connection.findMany({
    where: { userId: user?.id },
    include: {
      user: true,
      friend: true,
    },
  });

  if (connections.length === 0) {
    return (
      <div className="text-center text-muted-foreground">
        You haven&apos;t added any friends yet
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search friends..." className="pl-8" />
          </div>
        </div>
      </div>

      <ul className="divide-y">
        {connections.map(({ friend }) => (
          <div
            key={friend.id}
            className="flex items-center justify-between p-2 hover:bg-gray-50 rounded"
          >
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={friend.username || undefined} />
                <AvatarFallback>
                  {friend.username?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-medium">{friend.username}</h3>
                </div>
              </div>
            </div>
            <Button variant="ghost" size="icon" asChild>
              <Link href={`/chat/${friend.id}`}>
                <MessageCircle className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        ))}
      </ul>
    </div>
  );
}
