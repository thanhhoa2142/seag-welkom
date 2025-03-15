/** @format */
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Edit2, Star } from 'lucide-react';
import { mockStoreItems, mockUser, StoreItem, User } from '@/lib/constants';

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [storeItems, setStoreItems] = useState<StoreItem[]>([]);

  useEffect(() => {
    setUser(mockUser);
    setStoreItems(mockStoreItems);
  }, []);

  if (!user) return <div>Not found</div>;

  return (
    <div className='w-full flex flex-col items-center p-4 space-y-6'>
      {/* User Profile Section */}
      <Card className='w-full p-4'>
        <div className='flex items-center space-x-4'>
          <Image
            src={user.avatarUrl}
            alt={user.name}
            width={80}
            height={80}
            className='rounded-full'
          />
          <div className='flex-1'>
            <h2 className='text-xl font-bold'>{user.name}</h2>
            <p className='text-gray-600 text-sm'>{user.email}</p>
            <div className='flex space-x-2 mt-1'>
              {user.badges.map((badge, index) => (
                <Badge key={index} className={`${badge.color} text-xs`}>
                  {badge.icon} {badge.label}
                </Badge>
              ))}
            </div>
          </div>
          <Button variant='ghost' size='sm' className='ml-auto'>
            <Edit2 className='h-4 w-4' />
          </Button>
        </div>
      </Card>

      {/* About Me Section */}
      <Card className='w-full p-4'>
        <h3 className='text-lg font-semibold mb-2'>About me</h3>
        <p className='text-gray-700 text-s'>{user.aboutMe}</p>
      </Card>

      {/* Store Section */}
      <Card className='w-full p-4'>
        <div className='flex justify-between items-center mb-4'>
          <h3 className='text-lg font-semibold'>Store</h3>
          <p className='text-sm text-gray-600'>
            My Point: <Star className='inline h-4 w-4 text-yellow-500' />{' '}
            {user.points}
          </p>
          <a href='#' className='text-sm text-gray-500'>
            See All
          </a>
        </div>
        <div className='grid grid-cols-4 gap-4'>
          {storeItems.map((item) => (
            <Card key={item.id} className='p-2'>
              <div className='mb-1'>
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  width={300}
                  height={300}
                  objectFit='cover'
                  className='rounded-md'
                />
              </div>
              <h4 className='text-md font-medium truncate text-center'>
                {item.name}
              </h4>
              <p className='text-s text-center text-gray-500'>
                <Star className='inline h-3 w-3 text-yellow-500' />
                {item.price}
              </p>
              <Button variant='default' className='mt-1 w-full py-1 text-xs'>
                Exchange
              </Button>
              <p className='text-[12px] text-gray-500 mt-1 text-center'>
                {item.exchanged} Exchanged
              </p>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
}
