"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getPopularLocations } from "@/app/actions/challenges";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";

export function ChallengeList() {
  const router = useRouter();

  const {
    data: locations,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["popularLocations"],
    queryFn: getPopularLocations,
  });

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
        {isLoading ? (
          <ChallengeListLoading />
        ) : error ? (
          <p className="text-destructive">Error: {error.message}</p>
        ) : (
          locations?.data?.map((location) => (
            <Card
              key={location.id}
              className="cursor-pointer hover:bg-accent/5 pt-0 overflow-hidden"
              onClick={() => router.push(`/challenges/${location.id}`)}
            >
              <Image
                src={location.photoUrl || ""}
                alt={location.name}
                width={400}
                height={200}
                className="w-full h-48 object-cover"
              />
              <CardHeader>
                <CardTitle className="text-lg font-medium">
                  {location.name}
                </CardTitle>
                <ul>
                  {location.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="mr-1">
                      {tag}
                    </Badge>
                  ))}
                </ul>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {location.description}
                </p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

function ChallengeListLoading() {
  return [1, 2].map((i) => (
    <Card key={i} className="cursor-pointer hover:bg-accent/5">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-5 w-24" />
        </div>
      </CardHeader>
      <CardContent>
        <Skeleton className="h-4 w-full mb-4" />
        <div className="space-y-3">
          <Skeleton className="h-2 w-full" />
          <div className="flex justify-between">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
      </CardContent>
    </Card>
  ));
}
