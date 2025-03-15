/** @format */

'use client';

import { useRouter } from 'next/navigation';
import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getPopularLocations } from '@/app/actions/challenges';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';
import { Castle, Utensils, Map, Star } from 'lucide-react';
import { getMockPopularLocations } from '@/lib/mockData';

export function ChallengeList() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const useMockData = useMemo(
    () => process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true',
    []
  );
  const {
    data: locations,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['popularLocations'],
    queryFn: async () => {
      return useMockData
        ? await getMockPopularLocations()
        : await getPopularLocations();
    },
    initialData: { success: true, data: [] },
  });

  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <h2 className='text-2xl font-semibold tracking-tight'>Challenges</h2>
        <Button variant='outline' asChild>
          <Link href='/challenges'>View All</Link>
        </Button>
      </div>

      <div className='flex space-x-4 mt-2'>
        <button
          className={`flex items-center space-x-2 px-4 py-2 rounded-full ${
            selectedCategory === 'Historical'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-black'
          }`}
          onClick={() => setSelectedCategory('Historical')}
        >
          <Castle className='h-5 w-5' />
          <span>Historical</span>
        </button>
        <button
          className={`flex items-center space-x-2 px-4 py-2 rounded-full ${
            selectedCategory === 'Foodie Hunt'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-black'
          }`}
          onClick={() => setSelectedCategory('Foodie Hunt')}
        >
          <Utensils className='h-5 w-5' />
          <span>Foodie Hunt</span>
        </button>
        <button
          className={`flex items-center space-x-2 px-4 py-2 rounded-full ${
            selectedCategory === 'Outdoor'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-black'
          }`}
          onClick={() => setSelectedCategory('Outdoor')}
        >
          <Map className='h-5 w-5' />
          <span>Outdoor</span>
        </button>
      </div>

      {/* Challenge Cards */}
      <div className='grid gap-4'>
        {isLoading ? (
          <ChallengeListLoading />
        ) : error ? (
          <p className='text-destructive'>Error: {error.message}</p>
        ) : (
          locations?.data
            ?.filter((location) =>
              selectedCategory ? location.tags.includes(selectedCategory) : true
            )
            .map((location) => (
              <Card
                key={location.id}
                className='cursor-pointer hover:bg-accent/5 pt-0 overflow-hidden'
                onClick={() => router.push(`/challenges/${location.id}`)}
              >
                <Image
                  src={location.photoUrl || ''}
                  alt={location.name}
                  width={400}
                  height={200}
                  className='w-full h-48 object-cover'
                />
                <CardHeader>
                  <div className='flex justify-between items-center'>
                    <CardTitle className='text-lg font-medium'>
                      {location.name}
                    </CardTitle>
                    <div className='flex items-center space-x-1'>
                      <Star
                        className='h-5 w-5 text-yellow-500'
                        fill='currentColor'
                        stroke='none'
                      />
                      <span>{location.reward}</span>
                    </div>
                  </div>
                  <div className='text-sm text-muted-foreground'>
                    {location.difficulty} - {location.distance.toFixed(1)} km -{' '}
                    {location.time}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className='text-sm text-muted-foreground'>
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
    <Card
      key={i}
      className='cursor-pointer hover:bg-accent/5 pt-0 overflow-hidden'
    >
      <Skeleton className='w-full h-48' />
      <CardHeader>
        <div className='flex justify-between items-center'>
          <Skeleton className='h-6 w-32' />
          <Skeleton className='h-5 w-16' />
        </div>
        <Skeleton className='h-4 w-48 mt-2' />
      </CardHeader>
      <CardContent>
        <Skeleton className='h-4 w-full' />
      </CardContent>
    </Card>
  ));
}
