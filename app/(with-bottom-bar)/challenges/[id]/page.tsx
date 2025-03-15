import { getLocationById } from "@/app/actions/challenges";
import { ChallengeDetail } from "../components/challenge-detail";
import ChallengeItem from "../components/challenge-item";

export const metadata: Metadata = {
  title: "Challenge Details",
  description: "View and complete challenge tasks",
};

interface ChallengePageProps {
  params: Promise<{ id: string }>;
}

export default async function ChallengePage({ params }: ChallengePageProps) {
  const id = (await params).id;

  const location = await getLocationById(id);

  if (!location) {
    return {
      status: 404,
      title: "Challenge not found",
      description: "The challenge you are looking for does not exist",
    };
  }

  return (
    <div className="-mx-4 -mt-4">
      <ChallengeItem
        location={location}
        className={"rounded-none"}
        imageClassName="h-52"
      />
      <ChallengeDetail location={location} />
    </div>
  );
}
