/** @format */

'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { signup } from '@/app/actions/auth';

// Define the form schema
const formSchema = z
  .object({
    username: z.string().min(2, {
      message: 'Username must be at least 2 characters.',
    }),
    phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, {
      message: 'Please enter a valid phone number.',
    }),
    password: z.string().min(8, {
      message: 'Password must be at least 8 characters.',
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export function SignUpForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Initialize the form with the schema and default values
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
  });

  // Handle form submission
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError(null); // Clear any previous errors

    try {
      // Exclude confirmPassword since the server likely doesn’t need it
      const { confirmPassword, ...signupData } = values;
      const result = await signup(signupData);

      // Assume signup returns { success: boolean, message?: string }
      if (result.success) {
        // Redirect to sign-in page on success
        router.push('/sign-in');
      } else {
        // Display error message from server
        setError(result.message || 'Sign up failed');
      }
    } catch (error) {
      // Handle unexpected errors (e.g., network issues)
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          {/* Display error message if present */}
          {error && <div className='text-red-500 mb-4'>{error}</div>}

          {/* Username field */}
          <FormField
            control={form.control}
            name='username'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-lg'>
                  Username <span className='text-pink-500'>*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    className='bg-gray-100 rounded-md placeholder-gray-400 p-6'
                    placeholder='Enter your username'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Phone field */}
          <FormField
            control={form.control}
            name='phone'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-lg'>
                  Phone Number <span className='text-pink-500'>*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    className='bg-gray-100 rounded-md placeholder-gray-400 p-6'
                    placeholder='Enter your phone number'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password field */}
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-lg'>
                  Password <span className='text-pink-500'>*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type='password'
                    className='bg-gray-100 rounded-md placeholder-gray-400 p-6'
                    placeholder='Your Password'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Confirm Password field */}
          <FormField
            control={form.control}
            name='confirmPassword'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-lg'>
                  Confirm Password <span className='text-pink-500'>*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type='password'
                    className='bg-gray-100 rounded-md placeholder-gray-400 p-6'
                    placeholder='Confirm Your Password'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit button */}
          <Link href='/sign-in'>
            <Button
              type='submit'
              className='w-full bg-green-800 text-white font-bold rounded-md p-6'
            >
              {isLoading ? 'Creating account...' : 'Sign Up'}
            </Button>
          </Link>
        </form>

        <p className='text-black text-center mt-4'>
          Already have an account?
          <Link
            href='/sign-in'
            className='underline text-green-700 font-semibold ml-2'
          >
            Sign In
          </Link>
        </p>
      </Form>
    </div>
  );
}
