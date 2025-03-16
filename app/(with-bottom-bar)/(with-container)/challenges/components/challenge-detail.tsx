/** @format */

'use client';

import { ChangeEventHandler, useMemo, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { GetLocationByIdReturnType } from '@/app/actions/challenges';
import { getUserTasks, updateTaskStatus } from '@/app/actions/tasks';
import { PageContainer } from '@/components/ui2/page-container';
import { CheckCircle2Icon } from 'lucide-react';
import Resizer from 'react-image-file-resizer';
import Image from 'next/image';

export function ChallengeDetail({
  location,
}: {
  location: NonNullable<GetLocationByIdReturnType>;
}) {
  const router = useRouter();
  const tasks = location.tasks;
  const { data: completedTasks, refetch } = useQuery({
    queryKey: ['completedTasks'],
    queryFn: () => getUserTasks(),
  });
  const imageInputRef = useRef<HTMLInputElement>(null);

  const combinedTasks = useMemo(() => {
    return tasks.map((task) => {
      const userTask = completedTasks?.find((t) => t.taskId === task.id);
      return { ...task, userTask, isCompleted: !!userTask };
    });
  }, [completedTasks]);

  const handleCapture: ChangeEventHandler<HTMLInputElement> = async ({
    target,
  }) => {
    if (target.files) {
      if (target.files.length !== 0) {
        const file = target.files[0];
        const task = combinedTasks.find((t) => t.photoUrlRequired);
        if (!task) return;

        const resizedFile = await new Promise((resolve) => {
          Resizer.imageFileResizer(
            file,
            300,
            300,
            'JPEG',
            100,
            0,
            resolve,
            'file'
          );
        });
        handleTaskToggle(task.id, !task.isCompleted, resizedFile);
      }
    }
  };

  const progress =
    combinedTasks.filter((task) => task.isCompleted).length / tasks.length;

  const handleTaskToggle = async (
    taskId: string,
    isCompleted: boolean,
    photoDataUrl?: Parameters<typeof updateTaskStatus>['0']['photoDataUrl']
  ) => {
    await updateTaskStatus({ id: taskId, photoDataUrl });
    refetch();
    toast.success(isCompleted ? 'Task completed' : 'Task uncompleted');
  };

  return (
    <>
      <button
        className='mb-4 px-4 py-2 text-md text-gray-500 underline'
        onClick={() => router.push('/challenges')}
      >
        ← Back to Challenges
      </button>
      <div className='px-2 pb-4 bg-emerald-700/10 '>
        <div className='h-2 bg-green-800/20 rounded-full overflow-hidden'>
          <div
            className='h-full bg-green-800'
            style={{ width: `${progress * 100}%` }}
          ></div>
        </div>
      </div>
      <PageContainer className='pt-2'>
        <input
          ref={imageInputRef}
          accept='image/*'
          type='file'
          capture='environment'
          onChange={handleCapture}
          className='hidden'
        />
        <div className='w-full'>
          <div className='space-y-2'>
            <h2 className='text-lg font-semibold'>Tasks</h2>
            <div className='space-y-4'>
              {combinedTasks
                .filter((task) => !task.isCompleted)
                .map((task) => (
                  <div
                    key={task.id}
                    className='flex items-center space-x-2'
                    onClick={async () => {
                      if (task.photoUrlRequired) {
                        imageInputRef.current?.click();
                      } else handleTaskToggle(task.id, !task.isCompleted);
                    }}
                  >
                    <div className='h-5 w-5 rounded-full border border-gray-400 flex-shrink-0 cursor-pointer' />
                    <div className='text-sm'>
                      {task.description}
                      {task.photoUrlRequired && (
                        <div className='rounded-lg p-1.5 border border-dashed border-slate-200 bg-slate-100 w-fit'>
                          <div className='size-12 bg-slate-300 rounded text-[10px] text-slate-500 text-center flex items-center justify-center'>
                            Photo is required
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
          {combinedTasks.filter((task) => task.isCompleted).length ? (
            <div className='space-y-2 mt-4'>
              <h2 className='text-lg font-semibold'>Completed</h2>
              <div className='space-y-2'>
                {combinedTasks
                  .filter((task) => task.isCompleted)
                  .map((task) => (
                    <div
                      key={task.id}
                      className='flex items-center space-x-1.5'
                      onClick={() => {
                        const result = confirm(
                          'Are you sure you want to uncomplete this task?'
                        );
                        if (result)
                          handleTaskToggle(task.id, !task.isCompleted);
                      }}
                    >
                      <CheckCircle2Icon className='size-7 -ml-1 rounded-full flex-shrink-0 fill-emerald-700 text-white font-bold' />
                      <p className='text-sm flex items-center gap-2'>
                        {task.description}
                        {task.userTask?.photoUrl && (
                          <div className='rounded-lg p-1.5 border border-dashed border-slate-200 bg-slate-100 w-fit'>
                            <div className='relative size-12 rounded overflow-hidden'>
                              <Image
                                src={task.userTask?.photoUrl}
                                fill
                                alt='Task photo'
                                className='object-cover'
                              />
                            </div>
                          </div>
                        )}
                      </p>
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
