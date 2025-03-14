"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users } from "lucide-react";

interface HotSpot {
  id: string;
  name: string;
  location: string;
  activeUsers: number;
  type: "study" | "social" | "food" | "sports";
}

const mockHotspots: HotSpot[] = [
  {
    id: "1",
    name: "Central Library",
    location: "Main Campus",
    activeUsers: 45,
    type: "study",
  },
  {
    id: "2",
    name: "Student Hub",
    location: "Student Center",
    activeUsers: 78,
    type: "social",
  },
  {
    id: "3",
    name: "Sports Complex",
    location: "North Campus",
    activeUsers: 32,
    type: "sports",
  },
  // Add more mock hotspots as needed
];

const typeColors = {
  study: "bg-blue-100 text-blue-800",
  social: "bg-purple-100 text-purple-800",
  food: "bg-orange-100 text-orange-800",
  sports: "bg-green-100 text-green-800",
};

export function MapOverview() {
  const [hotspots] = useState<HotSpot[]>(mockHotspots);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium">Popular Places</CardTitle>
        <Button variant="outline" size="sm">
          Open Map
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {hotspots.map((hotspot) => (
            <div
              key={hotspot.id}
              className="flex items-center justify-between space-x-4"
            >
              <div className="flex items-center space-x-4">
                <div className="rounded-full p-2 bg-primary/10">
                  <MapPin className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium leading-none">
                    {hotspot.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {hotspot.location}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary">
                  <Users className="mr-1 h-3 w-3" />
                  {hotspot.activeUsers}
                </Badge>
                <Badge variant="outline" className={typeColors[hotspot.type]}>
                  {hotspot.type}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
