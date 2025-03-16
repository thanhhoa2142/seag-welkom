/** @format */

import { SignUpForm } from '../components/sign-up-form';

export const metadata: Metadata = {
  title: 'Sign Up',
  description: 'Create a new account',
};

export default function SignUpPage() {
  return (
    <>
      <div className='flex flex-col space-y-2 text-center'>
        <h1 className='text-3xl font-bold text-green-700 mb-2'>Sign Up</h1>
        <p className='text-gray-600 mb-4 text-md'>
          Sign up and explore Melbourne!
        </p>
      </div>
      <SignUpForm />
    </>
  );
}
