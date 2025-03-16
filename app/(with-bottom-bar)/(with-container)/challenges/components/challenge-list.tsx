/** @format */

"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getPopularLocations } from "@/app/actions/challenges";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { LocationTag } from "@prisma/client";
import ChallengeItem from "./challenge-item";
import Link from "next/link";
import { categoryTitleMap } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

export function ChallengeList() {
  const [selectedCategory, setSelectedCategory] = useState<LocationTag>(
    LocationTag.HISTORICAL
  );
  const pathname = usePathname();
  const isHomePage = pathname === "/home";

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
    <div className="space-y-2">
      {isHomePage && (
        <header className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Activities</h2>

          <Button variant={"secondaryGreen"} size={"sm"}>
            See all
          </Button>
        </header>
      )}
      <div className="flex overflow-auto space-x-4 mt-2 pb-2">
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
            .slice(0, isHomePage ? 3 : undefined)
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
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const loadingItemCount = isHomePage ? 3 : 2;

  return Array.from({ length: loadingItemCount }).map((_, i) => (
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
