import { Input } from "@/components/ui/input";
import { ChevronRight, Search } from "lucide-react";
import Link from "next/link";
import EmojiAvatar from "@/components/ui2/emoji-avatar";
import { prisma, thisUser } from "@/lib/db";

export default async function FriendsList() {
  const user = await thisUser;
  if (!user) throw new Error("User not found");
  const friends = await prisma.connection.findMany({
    where: { userId: user.id },
    include: { friend: true },
  });

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search friends..." className="pl-8" />
      </div>

      {/* Friends List */}
      <div className="flex-1 -mx-4 mt-2 overflow-auto">
        <ul className="divide-y">
          {friends.map((item, index) => {
            const message =
              "lorem issue lorem issue lorem issue lorem issuelorem issue lorem issuelorem issue lorem issuelorem issue lorem issuelorem issue lorem issue";
            const timestamp = "2025-03-16";

            return (
              <Link
                key={item.id}
                href={"/chat/" + item.id}
                className="flex items-center justify-between pl-5 pr-4 py-3 hover:bg-gray-50"
              >
                <div className="w-full flex items-center space-x-4 relative">
                  {index === 0 && (
                    <span className="w-2 h-2 bg-blue-500 rounded-full absolute top-1/2 -translate-y-1/2 -left-3.5" />
                  )}
                  <EmojiAvatar
                    name={item.friend.username}
                    className="size-10 shrink-0"
                  />
                  <div className="w-full">
                    <div className="flex justify-between items-center">
                      <h3 className="text-sm font-semibold">
                        {item.friend.username}
                      </h3>
                      {/* Timestamp and Chat Button */}
                      <div className="flex items-center gap-1">
                        {timestamp && (
                          <span className="text-xs text-gray-400">
                            {timestamp}
                          </span>
                        )}
                        <ChevronRight className="size-4 text-gray-400" />
                      </div>
                    </div>
                    {message && (
                      <p className="text-xs text-gray-500 line-clamp-2 mt-1">
                        {message}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
