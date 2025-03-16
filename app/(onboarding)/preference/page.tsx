/** @format */

import { OnboardingForm } from '../components/onboarding-form';

export const metadata: Metadata = {
  title: 'Onboarding',
  description: 'Tell us about yourself',
};

export default function OnboardingPage() {
  return (
    <div className='container relative min-h-screen py-8'>
      <div className='mx-auto flex max-w-[550px] w-full flex-col justify-center space-y-6 px-4 sm:px-0'>
        <div className='flex flex-col space-y-2 text-center'>
          <h1 className='text-3xl font-bold text-green-700 tracking-tight'>
            Welcome to Welkom!
          </h1>
          <p className='text-dm text-muted-foreground'>
            Help us personalize your experience by answering a few questions
          </p>
        </div>
        <OnboardingForm />
      </div>
    </div>
  );
}
