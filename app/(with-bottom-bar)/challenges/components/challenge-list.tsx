"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getPopularLocations } from "@/app/actions/challenges";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { LocationTag } from "@prisma/client";
import ChallengeItem from "./challenge-item";
import Link from "next/link";

const categoryTitleMap: Record<LocationTag, string> = {
  HISTORICAL: "🏛️ Historian",
  ART: "🎨 Artist",
  CULTURAL: "🥮 Cultural enthusiast",
  NATURE: "🍀 Nature Lover",
};

export function ChallengeList() {
  const [selectedCategory, setSelectedCategory] = useState<LocationTag>(
    LocationTag.HISTORICAL
  );
  const {
    data: locations,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["popularLocations"],
    queryFn: getPopularLocations,
    initialData: [],
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-semibold tracking-tight">Activities</h2>
      </div>

      <div className="flex overflow-auto space-x-4 mt-2">
        {[...Object.keys(categoryTitleMap)].map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded-full text-sm min-w-fit ${
              selectedCategory === category ? "bg-emerald-100" : "bg-gray-100"
            }`}
            onClick={() => setSelectedCategory(category as LocationTag)}
          >
            {categoryTitleMap[category as LocationTag]}
          </button>
        ))}
      </div>

      {/* Challenge Cards */}
      <div className="grid gap-4">
        {isLoading ? (
          <ChallengeListLoading />
        ) : error ? (
          <p className="text-destructive">Error: {error.message}</p>
        ) : (
          locations
            ?.filter((location) =>
              selectedCategory ? location.tags.includes(selectedCategory) : true
            )
            .map((location) => (
              <Link key={location.id} href={`/challenges/${location.id}`}>
                <ChallengeItem key={location.id} location={location} />
              </Link>
            ))
        )}
      </div>
    </div>
  );
}

function ChallengeListLoading() {
  return [1, 2].map((i) => (
    <Card
      key={i}
      className="cursor-pointer hover:bg-accent/5 pt-0 overflow-hidden"
    >
      <Skeleton className="w-full h-48" />
      <CardHeader>
        <div className="flex justify-between items-center">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-5 w-16" />
        </div>
        <Skeleton className="h-4 w-48 mt-2" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-4 w-full" />
      </CardContent>
    </Card>
  ));
}
