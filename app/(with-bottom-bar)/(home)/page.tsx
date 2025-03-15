/** @format */

import { ChallengeList } from '../challenges/components/challenge-list';
import { RecentChallenge } from '../../components/map/recent-challenge';
import { PageHeader } from '../../../components/ui2/header';
import TipsOfTheDay from './components/tips-of-the-day';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Your personal dashboard',
};

export default function DashboardPage() {
  return (
    <>
      <PageHeader heading='' text="Here's what's happening around you" />
      <div className='space-y-4'>
        <RecentChallenge />
        <ChallengeList />
        <TipsOfTheDay />
      </div>
    </>
  );
}
