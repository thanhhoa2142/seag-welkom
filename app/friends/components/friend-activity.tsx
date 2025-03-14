"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MapPin, Trophy } from "lucide-react";

interface Activity {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  type: "location" | "challenge";
  content: string;
  timestamp: string;
  location?: string;
  achievement?: string;
}

const mockActivities: Activity[] = [
  {
    id: "1",
    user: {
      name: "Sarah Chen",
      avatar: "/avatars/sarah.jpg",
    },
    type: "location",
    content: "visited a new location",
    timestamp: "2 hours ago",
    location: "Central Library",
  },
  {
    id: "2",
    user: {
      name: "Michael Tan",
      avatar: "/avatars/michael.jpg",
    },
    type: "challenge",
    content: "completed a challenge",
    timestamp: "3 hours ago",
    achievement: "Campus Explorer",
  },
  // Add more mock activities as needed
];

export function FriendActivity() {
  const [activities] = useState<Activity[]>(mockActivities);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Friend Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start space-x-4 border-b last:border-0 pb-4 last:pb-0"
            >
              <Avatar>
                <AvatarImage
                  src={activity.user.avatar}
                  alt={activity.user.name}
                />
                <AvatarFallback>
                  {activity.user.name.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {activity.user.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {activity.content}
                </p>
                <div className="flex items-center space-x-2">
                  {activity.type === "location" && (
                    <Badge
                      variant="outline"
                      className="flex items-center space-x-1"
                    >
                      <MapPin className="h-3 w-3" />
                      <span>{activity.location}</span>
                    </Badge>
                  )}
                  {activity.type === "challenge" && (
                    <Badge
                      variant="outline"
                      className="flex items-center space-x-1"
                    >
                      <Trophy className="h-3 w-3" />
                      <span>{activity.achievement}</span>
                    </Badge>
                  )}
                  <span className="text-xs text-muted-foreground">
                    {activity.timestamp}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
