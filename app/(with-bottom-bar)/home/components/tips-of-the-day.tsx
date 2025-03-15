/** @format */

'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lightbulb } from 'lucide-react';

// Define the interface for a DailyTip, matching Prisma model with optional category
interface DailyTip {
  id: string;
  title: string;
  description: string;
  category?: string; // Optional, as Prisma model doesn't have it, but mock data does
}

// Mock data as fallback
const tips: DailyTip[] = [
  {
    id: '1',
    title: 'Coffee Culture',
    description: "Try a flat white at one of Melbourne's famous laneway cafes",
    category: 'Food & Drink',
  },
  {
    id: '2',
    title: 'Tram Travel',
    description: 'Use the free tram zone in the CBD to explore the city',
    category: 'Transport',
  },
  {
    id: '3',
    title: 'Hidden Bars',
    description: 'Look for unmarked doors in the CBD for secret cocktail bars',
    category: 'Nightlife',
  },
  {
    id: '4',
    title: 'Street Art',
    description: 'Check out the vibrant murals in Hosier Lane',
    category: 'Culture',
  },
];

// Function to fetch daily tips from the API endpoint
const fetchDailyTips = async (): Promise<DailyTip[]> => {
  const response = await fetch('/api/daily-tips');
  if (!response.ok) {
    throw new Error('Failed to fetch daily tips');
  }
  return response.json();
};

export default function TipsOfTheDay() {
  const [currentTip, setCurrentTip] = useState<DailyTip | null>(null);
  const { data: tipsFromDb, isLoading } = useQuery({
    queryKey: ['dailyTips'],
    queryFn: fetchDailyTips,
  });

  // Effect to select a random tip when data is available
  useEffect(() => {
    if (isLoading) return;
    const availableTips =
      tipsFromDb && tipsFromDb.length > 0 ? tipsFromDb : tips;
    const randomIdx = Math.floor(Math.random() * availableTips.length);
    setCurrentTip(availableTips[randomIdx]);
  }, [tipsFromDb, isLoading]);

  if (!currentTip) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-lg font-medium flex items-center'>
          <Lightbulb className='mr-2 h-3 w-3' />
          Melbourne Tip of the Day
        </CardTitle>
      </CardHeader>
      <CardContent>
        <h3 className='text-sm font-medium mb-1'>{currentTip.title}</h3>
        <p className='text-sm text-muted-foreground'>
          {currentTip.description}
        </p>
      </CardContent>
    </Card>
  );
}
