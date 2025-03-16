/** @format */

import { SignInForm } from '../components/sign-in-form';

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Sign in to your account',
};

export default function SignInPage() {
  return (
    <>
      <div className='flex flex-col space-y-2 text-center'>
        <h1 className='text-3xl font-bold text-green-700 mb-2'>Welcome!</h1>
        <p className='text-gray-600 mb-4 text-md'>
          Enter your credentials to sign in to your account
        </p>
      </div>
      <SignInForm />
    </>
  );
}
