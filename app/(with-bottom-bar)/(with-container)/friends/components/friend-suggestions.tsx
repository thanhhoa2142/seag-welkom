/** @format */

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

import { UserPlus, ArrowLeft } from 'lucide-react';
import EmojiAvatar from '@/components/ui2/emoji-avatar';

interface FriendSuggestion {
  id: string;
  name: string;
  avatar: string;
  university: string;
  country: string;
  commonHobbies: string[];
  mutualFriends: number;
}

const mockSuggestions: FriendSuggestion[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    avatar: '/avatars/sarah.jpg',
    university: 'National University of Singapore',
    country: 'Singapore',
    commonHobbies: ['Photography', 'Hiking'],
    mutualFriends: 3,
  },
  {
    id: '2',
    name: 'Michael Tan',
    avatar: '/avatars/michael.jpg',
    university: 'Nanyang Technological University',
    country: 'Singapore',
    commonHobbies: ['Gaming', 'Basketball'],
    mutualFriends: 2,
  },
];

export function FriendSuggestions() {
  const router = useRouter();
  const [pendingRequests, setPendingRequests] = useState<Set<string>>(
    new Set()
  );

  const handleSendRequest = async (friendId: string) => {
    setPendingRequests((prev) => new Set([...prev, friendId]));

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success('Friend Request Sent', {
        description: "They'll be notified of your request",
      });
    } catch {
      toast.error('Error', {
        description: 'Failed to send friend request. Please try again.',
      });
      setPendingRequests((prev) => {
        const newSet = new Set(prev);
        newSet.delete(friendId);
        return newSet;
      });
    }
  };

  return (
    <div>
      <Button
        className='mb-4 flex items-center gap-2'
        variant='outline'
        onClick={() => router.push('/friends')}
      >
        <ArrowLeft className='h-4 w-4' /> Back to Friends
      </Button>

      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {mockSuggestions.map((friend) => (
          <Card key={friend.id}>
            <CardHeader className='flex flex-row items-center gap-4'>
              <EmojiAvatar name={friend.name} />
              <div className='flex flex-col'>
                <h3 className='font-semibold'>{friend.name}</h3>
                <p className='text-sm text-muted-foreground'>
                  {friend.university}
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <div className='flex flex-wrap gap-2'>
                {friend.commonHobbies.map((hobby) => (
                  <Badge key={hobby} variant='secondary'>
                    {hobby}
                  </Badge>
                ))}
              </div>
              <p className='mt-2 text-sm text-muted-foreground'>
                {friend.mutualFriends} mutual friends
              </p>
            </CardContent>
            <CardFooter>
              <Button
                className='w-full'
                onClick={() => handleSendRequest(friend.id)}
                disabled={pendingRequests.has(friend.id)}
              >
                <UserPlus className='mr-2 h-4 w-4' />
                {pendingRequests.has(friend.id) ? 'Request Sent' : 'Add Friend'}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
