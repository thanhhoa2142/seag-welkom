/** @format */

'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import { PageContainer } from '@/components/ui2/page-container';
import { getMockLocationById, mockLocation } from '@/lib/mockData';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';

type Task = {
  id: string;
  title: string;
  isCompleted: boolean;
};

export function ChallengeDetail() {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>(mockLocation.tasks);

  const { data: location, isLoading } = useQuery({
    queryKey: ['location', 'shrine-of-remembrance'],
    queryFn: () => getMockLocationById('shrine-of-remembrance'),
    initialData: null,
  });

  useEffect(() => {
    if (location) {
      setTasks(location.tasks);
    }
  }, [location]);

  const progress = useMemo(() => {
    if (!tasks.length) return 0;
    const completedTasks = tasks.filter((task) => task.isCompleted).length;
    return Math.round((completedTasks / tasks.length) * 100);
  }, [tasks]);

  const handleTaskToggle = async (taskId: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
    console.log('Task Updated ' + (location?.id || 'loc1'), {
      description: 'Your progress has been saved',
    });
  };

  if (isLoading || !location) {
    return <div>Loading...</div>;
  }

  return (
    <PageContainer className='text-gray-800 min-h-screen pb-20'>
      <div className='p-4'>
        <Button
          variant='ghost'
          onClick={() => router.back()}
          className='text-gray-400'
        >
          ← Back
        </Button>
      </div>

      <div className='relative h-48 md:h-64 w-full'>
        <Image
          src={location.photoUrl || '/default-banner.jpg'}
          alt={location.name}
          layout='fill'
          objectFit='cover'
        />
      </div>

      <div className='p-4 space-y-6'>
        {/* Header */}
        <div className='space-y-1'>
          <div className='flex justify-between items-start'>
            <h1 className='text-2xl font-bold'>{location.name}</h1>
            <div className='flex items-center'>
              <Star className='h-5 w-5 text-yellow-500 fill-yellow-500' />
              <span className='ml-1 font-bold'>{location.reward || '300'}</span>
            </div>
          </div>

          <div className='flex items-center text-sm text-gray-400 space-x-2'>
            <span>{location.difficulty || 'Hard'}</span>
            <span>•</span>
            <span>{location.distance || '5.0'} km</span>
            <span>•</span>
            <span>{location.time || '2h 5m'}</span>
          </div>

          <p className='text-gray-400 mt-2 text-sm'>
            {location.description ||
              'Built to honor Australian soldiers, the Shrine offers breathtaking city views. Every year, on November 11 at 11 AM, a ray of sunlight hits the Remembrance Stone.'}
          </p>
        </div>

        <div className='w-full'>
          <div className='h-1 bg-green-800 rounded-full overflow-hidden'>
            <div
              className='h-full bg-green-500'
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <div className='space-y-2'>
          <h2 className='text-lg font-semibold'>Tasks</h2>
          <div className='space-y-4'>
            {tasks
              .filter((task) => !task.isCompleted)
              .map((task, idx) => (
                <div key={task.id} className='flex items-start space-x-4'>
                  <div
                    onClick={() => handleTaskToggle(task.id)}
                    className='mt-1 h-5 w-5 rounded-full border border-gray-400 flex-shrink-0 cursor-pointer'
                  />
                  <div className='flex-1'>
                    <p className='text-gray-800 font-medium'>Task {idx + 1}</p>
                    <p className='text-gray-400 text-sm'>{task.title}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Completed Section */}
        <div className='space-y-2'>
          <h2 className='text-lg font-semibold'>Completed</h2>
          <div className='space-y-4'>
            {tasks
              .filter((task) => task.isCompleted)
              .map((task) => (
                <div key={task.id} className='flex items-start space-x-4'>
                  <div className='mt-1 h-5 w-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0'>
                    <span className='text-gray-800 text-xs'>✓</span>
                  </div>
                  <div className='flex-1'>
                    <p className='text-gray-300'>Inside the Sanctuary</p>
                    <p className='text-gray-400 text-sm mb-2'>
                      Capture the statue of the Unknown Soldier inside the
                      Shrine.
                    </p>
                    <div className='border border-gray-600 rounded-lg p-1 inline-block'>
                      <Image
                        src={task.thumbnail || '/api/placeholder/90/60'}
                        alt='Task completion'
                        width={90}
                        height={60}
                        className='rounded-md'
                      />
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
