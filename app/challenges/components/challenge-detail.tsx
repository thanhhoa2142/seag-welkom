"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";

import { Trophy, Users, Clock, MapPin } from "lucide-react";
import { PageContainer } from "@/components/ui2/page-container";

interface Task {
  id: string;
  description: string;
  completed: boolean;
  location?: string;
}

interface ChallengeDetails {
  id: string;
  title: string;
  description: string;
  participants: number;
  progress: number;
  category: string;
  daysLeft: number;
  tasks: Task[];
}

const mockChallenge: ChallengeDetails = {
  id: "1",
  title: "Campus Explorer",
  description:
    "Discover the hidden gems of your campus by visiting these key locations. Complete all tasks to earn the Campus Explorer badge!",
  participants: 128,
  progress: 60,
  category: "Exploration",
  daysLeft: 3,
  tasks: [
    {
      id: "t1",
      description: "Visit the Central Library",
      completed: true,
      location: "Central Library",
    },
    {
      id: "t2",
      description: "Check out the Student Hub",
      completed: true,
      location: "Student Center",
    },
    {
      id: "t3",
      description: "Explore the Science Building",
      completed: false,
      location: "Science Building",
    },
    {
      id: "t4",
      description: "Visit the Sports Complex",
      completed: false,
      location: "Sports Complex",
    },
    {
      id: "t5",
      description: "Find the Secret Garden",
      completed: false,
      location: "Botanic Gardens",
    },
  ],
};

interface ChallengeDetailProps {
  challengeId: string;
}

export function ChallengeDetail({ challengeId }: ChallengeDetailProps) {
  const router = useRouter();
  const [challenge, setChallenge] = useState<ChallengeDetails>(mockChallenge);

  const handleTaskToggle = async (taskId: string) => {
    setChallenge((prev) => ({
      ...prev,
      tasks: prev.tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      ),
      progress: calculateProgress(
        prev.tasks.map((task) =>
          task.id === taskId ? { ...task, completed: !task.completed } : task
        )
      ),
    }));

    toast("Task Updated " + challengeId, {
      description: "Your progress has been saved",
    });
  };

  const calculateProgress = (tasks: Task[]): number => {
    const completedTasks = tasks.filter((task) => task.completed).length;
    return (completedTasks / tasks.length) * 100;
  };

  return (
    <PageContainer>
      <Button variant="ghost" onClick={() => router.back()}>
        ← Back to Challenges
      </Button>
      <div className="flex items-center justify-between">
        <div>
          <CardTitle className="text-2xl">{challenge.title}</CardTitle>
          <p className="text-muted-foreground mt-2">{challenge.description}</p>
        </div>
        <Badge variant="secondary">{challenge.category}</Badge>
      </div>
      <div className="space-y-6">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center">
            <Users className="mr-2 h-4 w-4" />
            {challenge.participants} participants
          </div>
          <div className="flex items-center">
            <Clock className="mr-2 h-4 w-4" />
            {challenge.daysLeft} days left
          </div>
          <div className="flex items-center">
            <Trophy className="mr-2 h-4 w-4" />
            {challenge.progress}% completed
          </div>
        </div>

        <Progress value={challenge.progress} />

        <div className="space-y-4">
          <h3 className="font-semibold">Tasks</h3>
          {challenge.tasks.map((task) => (
            <div key={task.id} className="flex items-start space-x-4">
              <Checkbox
                checked={task.completed}
                onCheckedChange={() => handleTaskToggle(task.id)}
              />
              <div className="flex-1 space-y-1">
                <p
                  className={
                    task.completed ? "line-through text-muted-foreground" : ""
                  }
                >
                  {task.description}
                </p>
                {task.location && (
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="mr-1 h-3 w-3" />
                    {task.location}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageContainer>
  );
}
