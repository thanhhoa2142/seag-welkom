/** @format */

'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

export function FirstPageForm() {
  return (
    <div className='max-w-md mx-auto flex flex-col items-center space-y-6'>
      <Image
        src='/gift-icon.png'
        width={200}
        height={200}
        alt='Gift box illustration'
        className='object-contain'
      />

      <p className='text-center text-lg text-green-700 font-bold'>
        Explore, discover, and earn rewards
      </p>
      <p className='text-center text-2xl'>
        Unlock hidden gems and surprises across Australia
      </p>

      {/* Navigation Buttons */}
      <Link href='/sign-in' className='w-full'>
        <Button className='w-full bg-green-700 text-white rounded-md p-6'>
          Sign In
        </Button>
      </Link>
      <Link href='/sign-up' className='w-full'>
        <Button className='w-full bg-gray-200 text-green-700 rounded-md p-6'>
          Register
        </Button>
      </Link>
    </div>
  );
}
