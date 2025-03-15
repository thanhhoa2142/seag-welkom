"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";

import { Trophy } from "lucide-react";
import { PageContainer } from "@/components/ui2/page-container";
import { GetLocationByIdReturnType } from "@/app/actions/challenges";

interface ChallengeDetailProps {
  location: NonNullable<GetLocationByIdReturnType>;
}

export function ChallengeDetail({ location }: ChallengeDetailProps) {
  const router = useRouter();
  const [tasks, setTasks] = useState(location.tasks);
  const progress = useMemo(() => {
    const completedTasks = tasks.filter((task) => task.isCompleted).length;
    return (completedTasks / tasks.length) * 100;
  }, [tasks]);

  const handleTaskToggle = async (taskId: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, completed: !task.isCompleted } : task
      )
    );

    toast("Task Updated " + location.id, {
      description: "Your progress has been saved",
    });
  };

  return (
    <PageContainer>
      <Button variant="ghost" onClick={() => router.back()}>
        ← Back to Challenges
      </Button>

      <CardTitle className="text-2xl">{location.name}</CardTitle>
      <p className="text-muted-foreground mt-2 line-clamp-2">
        {location.description}
      </p>
      <Badge variant="secondary">{location.tags.join(", ")}</Badge>
      <div className="space-y-6">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          {/* <div className="flex items-center">
            <Users className="mr-2 h-4 w-4" />
            {location.participants} participants
          </div>
          <div className="flex items-center">
            <Clock className="mr-2 h-4 w-4" />
            {location.daysLeft} days left
          </div> */}
          <div className="flex items-center">
            <Trophy className="mr-2 h-4 w-4" />
            {progress}% completed
          </div>
        </div>

        <Progress value={progress} />

        <div className="space-y-4">
          <h3 className="font-semibold">Tasks</h3>
          {location.tasks.map((task) => (
            <div key={task.id} className="flex items-start space-x-4">
              <Checkbox
                checked={task.isCompleted}
                onCheckedChange={() => handleTaskToggle(task.id)}
              />
              <div className="flex-1 space-y-1">
                <p
                  className={
                    task.isCompleted ? "line-through text-muted-foreground" : ""
                  }
                >
                  {task.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageContainer>
  );
}
