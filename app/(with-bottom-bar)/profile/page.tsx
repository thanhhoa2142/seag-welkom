import { thisUser } from "@/lib/db";
import EmojiAvatar from "@/components/ui2/emoji-avatar";
import { Button } from "@/components/ui/button";
import { Settings2 } from "lucide-react";

export default async function Page() {
  const user = await thisUser;
  if (!user) return <div>Not found</div>;

  return (
    <div className="w-full flex items-center justify-center gap-2">
      <EmojiAvatar name={user.username} />
      <div>
        <strong>{user.username}</strong>
        <p className="text-gray-600 text-sm -mt-0.5">example@email.com</p>
      </div>

      <Button
        size={"sm"}
        variant={"secondary"}
        className="rounded-full ml-auto"
      >
        Edit <Settings2 />
      </Button>
    </div>
  );
}
