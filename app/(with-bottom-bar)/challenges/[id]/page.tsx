/** @format */

import { getLocationById } from '@/app/actions/challenges';
import { ChallengeDetail } from '../components/challenge-detail';
import { getMockLocationById } from '@/lib/mockData';

export const metadata: Metadata = {
  title: 'Challenge Details',
  description: 'View and complete challenge tasks',
};

interface ChallengePageProps {
  params: Promise<{ id: string }>;
}

export default async function ChallengePage({ params }: ChallengePageProps) {
  const id = (await params).id;

  const useMockData = process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true';
  const location = useMockData
    ? await getMockLocationById(id)
    : await getLocationById(id);

  if (!location) {
    return {
      status: 404,
      title: 'Challenge not found',
      description: 'The challenge you are looking for does not exist',
    };
  }

  return (
    <div className='container relative min-h-screen py-8'>
      <ChallengeDetail location={location} />
    </div>
  );
}
