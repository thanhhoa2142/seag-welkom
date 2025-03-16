/** @format */
'use client';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ChevronRight, Search } from 'lucide-react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import EmojiAvatar from '@/components/ui2/emoji-avatar';
import { getFriends } from '@/app/actions/hobbies';

export default function FriendsList() {
  const [searchQuery, setSearchQuery] = useState('');

  const { data: friendsData = [], isLoading } = useQuery({
    queryKey: ['friends'],
    queryFn: getFriends,
  });

  const filteredFriends = friendsData.filter((item) => {
    if ('friend' in item) {
      return item.friend?.username
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase());
    } else {
      //mock friend
      return item.name.toLowerCase().includes(searchQuery.toLowerCase());
    }
  });

  if (isLoading) {
    return <div className='text-center py-4'>Loading friends...</div>;
  }

  if (friendsData.length === 0) {
    return (
      <div className='text-center text-muted-foreground'>
        You have not added any friends yet
      </div>
    );
  }

  return (
    <div className='flex flex-col h-full bg-white'>
      <div className='px-4 pb-2'>
        <div className='relative'>
          <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
          <Input
            placeholder='Search friends...'
            className='pl-8'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Friends List */}
      <div className='flex-1 overflow-auto'>
        <ul className='divide-y'>
          {filteredFriends.map((item) => {
            let displayName, message, timestamp, isActive, id;

            if ('friend' in item) {
              // Database connection
              displayName = item.friend?.username || 'Unknown';
              message = ''; // No message in DB connections
              timestamp = ''; // No timestamp in DB connections
              isActive = false; // No isActive in DB connections
              id = item.friend?.id || '';
            } else {
              displayName = item.name;
              message = item.message;
              timestamp = item.timestamp;
              isActive = item.isActive;
              id = String(item.id);
            }

            return (
              <div
                key={id}
                className='flex items-center justify-between p-4 hover:bg-gray-50'
              >
                <div className='flex items-center space-x-4'>
                  {isActive && (
                    <span className='w-2 h-2 bg-blue-500 rounded-full' />
                  )}
                  <EmojiAvatar name={displayName} />
                  <div>
                    <h3 className='font-medium text-black'>{displayName}</h3>
                    {message && (
                      <p className='text-sm text-gray-500 line-clamp-1'>
                        {message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Timestamp and Chat Button */}
                <div className='flex items-center space-x-2'>
                  {timestamp && (
                    <span className='text-xs text-gray-400'>{timestamp}</span>
                  )}
                  <Button
                    variant='ghost'
                    size='icon'
                    asChild
                    className='h-8 w-8'
                  >
                    <Link href={`/chat/${id}`}>
                      <ChevronRight className='h-4 w-4 text-gray-400' />
                    </Link>
                  </Button>
                </div>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
