"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Trophy, Users } from "lucide-react";
import Link from "next/link";

interface Challenge {
  id: string;
  title: string;
  description: string;
  participants: number;
  progress: number;
  category: string;
  daysLeft: number;
}

const mockChallenges: Challenge[] = [
  {
    id: "1",
    title: "Campus Explorer",
    description: "Visit 5 different locations on campus this week",
    participants: 128,
    progress: 60,
    category: "Exploration",
    daysLeft: 3,
  },
  {
    id: "2",
    title: "Social Butterfly",
    description: "Make 3 new friends from different countries",
    participants: 256,
    progress: 33,
    category: "Social",
    daysLeft: 5,
  },
  // Add more mock challenges as needed
];

export function ChallengeList() {
  const router = useRouter();
  const [challenges] = useState<Challenge[]>(mockChallenges);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold tracking-tight">
          Active Challenges
        </h2>
        <Button variant="outline" asChild>
          <Link href="/challenges">View All</Link>
        </Button>
      </div>
      <div className="grid gap-4">
        {challenges.map((challenge) => (
          <Card
            key={challenge.id}
            className="cursor-pointer hover:bg-accent/5"
            onClick={() => router.push(`/challenges/${challenge.id}`)}
          >
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-medium">
                  {challenge.title}
                </CardTitle>
                <Badge variant="secondary">{challenge.category}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                {challenge.description}
              </p>
              <div className="space-y-3">
                <Progress value={challenge.progress} />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Users className="mr-1 h-4 w-4" />
                    {challenge.participants} participants
                  </div>
                  <div className="flex items-center">
                    <Trophy className="mr-1 h-4 w-4" />
                    {challenge.daysLeft} days left
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
