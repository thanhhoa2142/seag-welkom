import { ChallengeList } from "./components/challenge-list";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BookAudioIcon } from "lucide-react";

export default function Page() {
  return (
    <>
      <header>
        <div className="flex justify-between items-center gap-2 mb-2">
          <h1 className="text-2xl font-semibold tracking-tight">Challenges</h1>

          <Button asChild>
            <Link href="/friend-suggestions">
              <BookAudioIcon className="h-4 w-4" /> Plan a trip
            </Link>
          </Button>
        </div>
      </header>

      <ChallengeList />
    </>
  );
}
