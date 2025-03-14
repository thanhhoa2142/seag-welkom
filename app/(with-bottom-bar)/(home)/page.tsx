import { ChallengeList } from "../../challenges/components/challenge-list";
import { MapOverview } from "../../components/map/map-overview";
import { FriendActivity } from "../../friends/components/friend-activity";
import { PageHeader } from "../../../components/ui2/header";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Your personal dashboard",
};

export default function DashboardPage() {
  return (
    <>
      <PageHeader
        heading="Welcome back!"
        text="Here's what's happening around you"
      />
      <div className="space-y-4">
        <MapOverview />
        <ChallengeList />
        <FriendActivity />
      </div>
    </>
  );
}
