import { FriendSuggestions } from "../(with-bottom-bar)/(with-container)/friends/components/friend-suggestions";
import { PageContainer } from "@/components/ui2/page-container";

export const metadata: Metadata = {
  title: "Friend Suggestions",
  description: "Find and connect with new friends",
};

export default function FriendSuggestionsPage() {
  return (
    <PageContainer className="container relative min-h-screen py-8">
      <div className="mx-auto flex w-full flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">
            Suggested Friends
          </h1>
          <p className="text-sm text-muted-foreground">
            People you might want to connect with based on your preferences
          </p>
        </div>
        <FriendSuggestions />
      </div>
    </PageContainer>
  );
}
