/** @format */

'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lightbulb } from 'lucide-react';

interface DailyTip {
  id: string;
  title: string;
  description: string;
  category: string;
}

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

export default function TipsOfTheDay() {
  const [currentTip, setCurrentTip] = useState<DailyTip | null>(null);

  useEffect(() => {
    const randomIdx = Math.floor(Math.random() * tips.length);
    setCurrentTip(tips[randomIdx]);
  }, []);

  return (
    <>
      {currentTip && (
        <Card>
          <CardHeader>
            <div className='flex items-center justify-between'>
              <CardTitle className='text-lg font-medium flex items-center'>
                <Lightbulb className='mr-2 h-4 w-4' />
                Melbourne Tip of the Day
              </CardTitle>
              <Badge variant='secondary'>{currentTip.category}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <h3 className='text-sm font-medium mb-1'>{currentTip.title}</h3>
            <p className='text-sm text-muted-foreground'>
              {currentTip.description}
            </p>
          </CardContent>
        </Card>
      )}
    </>
  );
}
