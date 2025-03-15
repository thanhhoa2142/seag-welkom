/** @format */

import { PropsWithChildren } from 'react';
import { PageContainer } from './page-container';
import BottomBar from '@/components/ui2/bottom-bar';
import Chatbot from '@/app/(with-bottom-bar)/(home)/components/chatbot-question';

export default function ScreenWrap({ children }: PropsWithChildren) {
  return (
    <div className='h-dvh flex flex-col'>
      <PageContainer>{children}</PageContainer>

      <BottomBar />
      <Chatbot />
    </div>
  );
}
