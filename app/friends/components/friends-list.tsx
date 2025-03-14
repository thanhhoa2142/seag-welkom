"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, Search, UserPlus } from "lucide-react";

interface Friend {
  id: string;
  name: string;
  avatar: string;
  status: "online" | "offline";
  lastSeen?: string;
  university: string;
}

const mockFriends: Friend[] = [
  {
    id: "1",
    name: "Sarah Chen",
    avatar: "/avatars/sarah.jpg",
    status: "online",
    university: "National University of Singapore",
  },
  {
    id: "2",
    name: "Michael Tan",
    avatar: "/avatars/michael.jpg",
    status: "offline",
    lastSeen: "2 hours ago",
    university: "Nanyang Technological University",
  },
];

export function FriendsList() {
  const router = useRouter();
  const [friends] = useState<Friend[]>(mockFriends);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFriends = friends.filter((friend) =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search friends..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <Button onClick={() => router.push("/friend-suggestions")}>
          <UserPlus className="mr-2 h-4 w-4" />
          Add Friends
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Friends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredFriends.map((friend) => (
              <div
                key={friend.id}
                className="flex items-center justify-between"
              >
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={friend.avatar} alt={friend.name} />
                    <AvatarFallback>{friend.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-medium">{friend.name}</h3>
                      <Badge
                        variant={
                          friend.status === "online" ? "default" : "secondary"
                        }
                        className="text-xs"
                      >
                        {friend.status === "online" ? "Online" : "Offline"}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {friend.university}
                    </p>
                    {friend.status === "offline" && friend.lastSeen && (
                      <p className="text-xs text-muted-foreground">
                        Last seen {friend.lastSeen}
                      </p>
                    )}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => router.push(`/chat/${friend.id}`)}
                >
                  <MessageCircle className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
