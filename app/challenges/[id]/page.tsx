import { ChallengeDetail } from "../components/challenge-detail";

export const metadata: Metadata = {
  title: "Challenge Details",
  description: "View and complete challenge tasks",
};

interface ChallengePageProps {
  params: {
    id: string;
  };
}

export default function ChallengePage({ params }: ChallengePageProps) {
  return (
    <div className="container relative min-h-screen py-8">
      <ChallengeDetail challengeId={params.id} />
    </div>
  );
}
