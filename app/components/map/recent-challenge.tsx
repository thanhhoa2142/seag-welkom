"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import { Star } from "lucide-react";

interface Challenge {
  id: string;
  name: string;
  difficulty: string;
  distance: number; // In kilometers
  time: string; // e.g., "1h 30m"
  reward: number; // Points
  photoUrl: string; // URL for the banner image
  progress: number; // Percentage (0-100)
}

const mockChallenge: Challenge = {
  id: "state-library-victoria",
  name: "State Library Victoria",
  difficulty: "Easy",
  distance: 0.5, // In kilometers
  time: "1h 30m",
  reward: 100,
  photoUrl:
    "https://lh5.googleusercontent.com/p/AF1QipMBwsYfFhzSaKZ-E4yOioJB834E5tDZl3FO2YP-=w408-h408-k-no",
  progress: 50,
};
export function RecentChallenge() {
  const challenge = mockChallenge;

  return (
    <Card className="w-full shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-gray-900">
          Recent Active Challenge
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          {/* Banner Image */}
          <div className="relative w-20 h-20 rounded-lg overflow-hidden">
            <Image
              src={challenge.photoUrl}
              alt={challenge.name}
              layout="fill"
              objectFit="cover"
            />
          </div>

          {/* Challenge Details */}
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 uppercase">
              {challenge.name}
            </h3>
            <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
              <span>{challenge.difficulty}</span>
              <span>&bull;</span>
              <span>{challenge.distance}</span>
              <span>&bull;</span>
              <span>{challenge.time}</span>
              <span className="flex items-center text-yellow-500">
                <Star className="w-4 h-4 mr-1" />
                {challenge.reward}
              </span>
            </div>
            {/* Progress Bar */}
            <Progress
              value={challenge.progress}
              className="mt-2 h-2 bg-gray-200"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
