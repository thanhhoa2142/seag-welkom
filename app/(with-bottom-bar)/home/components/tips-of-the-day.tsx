"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DailyTip } from "@prisma/client";
import { getDailyTips } from "@/app/actions/hobbies";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { RefreshCcwIcon, X } from "lucide-react";

export default function TipsOfTheDay() {
  const [currentTip, setCurrentTip] = useState<DailyTip | null>(null);
  const { data: tipsFromDb, isLoading } = useQuery({
    queryKey: ["dailyTips"],
    queryFn: getDailyTips,
  });
  const [expanded, setExpanded] = useState(false);

  const showRandomTip = () => {
    if (isLoading || !tipsFromDb) return;
    const randomIdx = Math.floor(Math.random() * tipsFromDb.length);
    setCurrentTip(tipsFromDb[randomIdx]);
  };

  useEffect(() => {
    showRandomTip();
  }, [tipsFromDb, isLoading]);

  if (!currentTip) return null;

  return (
    <div className="absolute bottom-11 left-0 p-2">
      <div className="absolute top-5 right-4 space-x-2">
        <Button size={"iconSm"} variant={"outline"} onClick={showRandomTip}>
          <RefreshCcwIcon />
        </Button>
        <Button
          size={"iconSm"}
          variant={"ghost"}
          onClick={() => setCurrentTip(null)}
        >
          <X />
        </Button>
      </div>

      <Card className="w-full">
        <CardHeader>
          <div className="text-sm text-slate-500 flex items-center">
            <Image
              src={"/lightbulb.png"}
              width={24}
              height={24}
              alt="Lightbulb"
              className="mr-1 -mt-1"
            />
            Melbourne Tip of the Day
          </div>
        </CardHeader>
        <CardContent>
          <h3 className="text-sm font-medium mb-1">{currentTip.title}</h3>
          <p
            className={cn(
              "text-sm text-muted-foreground",
              expanded ? "line-clamp-none" : "line-clamp-2"
            )}
            onClick={() => setExpanded(!expanded)}
          >
            {currentTip.description}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
