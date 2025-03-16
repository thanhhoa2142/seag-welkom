/** @format */

import Image from 'next/image';
import { Progress } from '@/components/ui/progress';
import { prisma, thisUser } from '@/lib/db';
import { Button } from '@/components/ui/button';
import Point from '@/components/ui2/point';
import Link from 'next/link';
import { MapPin } from 'lucide-react';

export async function RecentChallenge() {
  const user = await thisUser;
  if (!user) return null;

  const userTask = await prisma.userTask.findFirst({
    where: { userId: user.id },
    orderBy: { completedAt: 'desc' },
    include: {
      task: {
        include: {
          location: {
            include: {
              tasks: {
                include: { userTasks: { where: { userId: user.id } } },
              },
            },
          },
        },
      },
    },
  });

  if (!userTask) return null;
  const challenge = userTask.task.location;
  const myAccruedPoints = userTask.task.location.tasks.reduce((acc, task) => {
    const userTask = task.userTasks.find((ut) => ut.userId === user.id);
    return acc + (userTask ? task.points : 0);
  }, 0);
  const totalPoints = userTask.task.location.tasks.reduce(
    (acc, task) => acc + task.points,
    0
  );

  return (
    <section>
      <header className='flex items-center justify-between mb-2'>
        <h2 className='text-lg font-semibold text-gray-900'>
          Recent Active Challenge
        </h2>

        <Link href='/challenges'>
          <Button variant={'secondaryGreen'} size={'sm'}>
            See all
          </Button>
        </Link>
      </header>
      <div className='w-full bg-accent rounded-md p-2 pb-3'>
        <div className='flex items-center space-x-4'>
          {/* Banner Image */}
          <div className='relative w-20 h-20 rounded-lg overflow-hidden'>
            <Image
              src={challenge.photoUrl}
              alt={challenge.name}
              fill
              className='object-cover'
            />
          </div>
          {/* Challenge Details */}
          <div className='flex-1'>
            <h3 className='font-semibold leading-5 mb-1'>{challenge.name}</h3>
            <p className='text-xs leading-3.5 text-gray-500 line-clamp-2'>
              {challenge.description}
            </p>
            <div className='flex justify-between items-center space-x-2 text-sm text-gray-500 mt-2'>
              <span className='inline-flex items-center gap-1 font-semibold text-sm'>
                <Point size={12} />
                {totalPoints}
              </span>

              <Button
                size={'xs'}
                variant={'outline'}
                className='gap-1 bg-slate-100'
              >
                Direction <MapPin />
              </Button>
            </div>
            {/* Progress Bar */}
          </div>
        </div>
        <Progress
          value={(myAccruedPoints / totalPoints) * 100}
          className='mt-2 h-2 bg-gray-200'
        />
      </div>
    </section>
  );
}
