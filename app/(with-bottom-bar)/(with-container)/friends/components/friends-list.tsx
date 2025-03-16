/** @format */

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import EmojiAvatar from "@/components/ui2/emoji-avatar";
import { mockFriends } from "@/lib/constants";
import { prisma, thisUser } from "@/lib/db";
import { ChevronRight, Search } from "lucide-react";
import Link from "next/link";

export async function FriendsList() {
  let connections = [];
  try {
    const user = await thisUser;
    connections = await prisma.connection.findMany({
      where: { userId: user?.id },
      include: { user: true, friend: true },
    });
  } catch (error) {
    console.error("Error fetching connections:", error);
  }

  // If no connections from database, use mock data
  const friendsData = connections.length > 0 ? connections : mockFriends;

  if (friendsData.length === 0) {
    return (
      <div className="text-center text-muted-foreground">
        You have not added any friends yet
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="px-4 pb-2">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search friends..." className="pl-8" />
        </div>
      </div>

      {/* Friends List */}
      <div className="flex-1 overflow-auto">
        <ul className="divide-y">
          {friendsData.map((item) => {
            const friend = connections.length > 0 ? item.friend : item;
            const message = connections.length > 0 ? "" : item.message;
            const timestamp = connections.length > 0 ? "" : item.timestamp;
            const isActive = connections.length > 0 ? false : item.isActive;

            return (
              <div
                key={friend.id}
                className="flex items-center justify-between p-4 hover:bg-gray-50"
              >
                <div className="flex items-center space-x-4">
                  {isActive && (
                    <span className="w-2 h-2 bg-blue-500 rounded-full" />
                  )}
                  <EmojiAvatar name={friend.username} />

                  {/* Username and Message */}
                  <div>
                    <h3 className="font-medium text-black">
                      {friend.username}
                    </h3>
                    {message && (
                      <p className="text-sm text-gray-500 line-clamp-1">
                        {message}
                      </p>
                    )}
                  </div>
                </div>
                {/* Timestamp and Chat Button */}
                <div className="flex items-center space-x-2">
                  {timestamp && (
                    <span className="text-xs text-gray-400">{timestamp}</span>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    asChild
                    className="h-8 w-8"
                  >
                    <Link href={`/chat/${friend.id}`}>
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    </Link>
                  </Button>
                </div>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
