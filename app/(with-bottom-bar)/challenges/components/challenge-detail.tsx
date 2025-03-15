"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { GetLocationByIdReturnType } from "@/app/actions/challenges";
import { getUserTasks, updateTaskStatus } from "@/app/actions/tasks";
import { PageContainer } from "@/components/ui2/page-container";
import { CheckCircle2Icon } from "lucide-react";

export function ChallengeDetail({
  location,
}: {
  location: NonNullable<GetLocationByIdReturnType>;
}) {
  const tasks = location.tasks;
  const { data: completedTasks, refetch } = useQuery({
    queryKey: ["completedTasks"],
    queryFn: () => getUserTasks(),
  });

  const combinedTasks = useMemo(() => {
    return tasks.map((task) => ({
      ...task,
      isCompleted: !!completedTasks?.find((t) => t.taskId === task.id),
    }));
  }, [completedTasks]);

  const progress =
    combinedTasks.filter((task) => task.isCompleted).length / tasks.length;

  const handleTaskToggle = async (taskId: string, isCompleted: boolean) => {
    await updateTaskStatus({ id: taskId, isCompleted });
    refetch();
    toast.success(isCompleted ? "Task completed" : "Task uncompleted");
  };

  return (
    <>
      <div className="px-2 pb-4 bg-emerald-700/10 ">
        <div className="h-2 bg-green-800/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-800"
            style={{ width: `${progress * 100}%` }}
          ></div>
        </div>
      </div>
      <PageContainer className="pt-2">
        <div className="w-full">
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Tasks</h2>
            <div className="space-y-4">
              {combinedTasks
                .filter((task) => !task.isCompleted)
                .map((task) => (
                  <div key={task.id} className="flex items-center space-x-2">
                    <div
                      onClick={() =>
                        handleTaskToggle(task.id, !task.isCompleted)
                      }
                      className="h-5 w-5 rounded-full border border-gray-400 flex-shrink-0 cursor-pointer"
                    />
                    <p className="text-sm">{task.description}</p>
                  </div>
                ))}
            </div>
          </div>
          {/* Completed Section */}
          {combinedTasks.filter((task) => task.isCompleted).length ? (
            <div className="space-y-2 mt-4">
              <h2 className="text-lg font-semibold">Completed</h2>
              <div className="space-y-2">
                {combinedTasks
                  .filter((task) => task.isCompleted)
                  .map((task) => (
                    <div
                      key={task.id}
                      className="flex items-center space-x-1.5"
                      onClick={() =>
                        handleTaskToggle(task.id, !task.isCompleted)
                      }
                    >
                      <CheckCircle2Icon className="size-7 -ml-1 rounded-full flex-shrink-0 fill-emerald-700 text-white font-bold" />
                      <p className="text-sm">{task.description}</p>
                    </div>
                  ))}
              </div>
            </div>
          ) : null}
        </div>
      </PageContainer>
    </>
  );
}
