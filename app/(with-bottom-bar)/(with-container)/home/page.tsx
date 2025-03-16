import { PageHeader } from "@/components/ui2/header";
import TipsOfTheDay from "./components/tips-of-the-day";
import { RecentChallenge } from "@/app/components/map/recent-challenge";
import { ChallengeList } from "../challenges/components/challenge-list";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Your personal dashboard",
};

export default function DashboardPage() {
  return (
    <>
      <div className="space-y-4">
        <PageHeader />
        <RecentChallenge />
        <ChallengeList />
        <TipsOfTheDay />
      </div>
    </>
  );
}
