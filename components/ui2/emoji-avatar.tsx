import { getAvatarAttributes } from "@/lib/utils";

export default function EmojiAvatar({ name }: { name: string }) {
  const avatar = getAvatarAttributes(name);
  return (
    <div
      className="size-12 text-3xl inline-flex items-center justify-center rounded-full"
      style={{ backgroundColor: avatar.color }}
    >
      {avatar.emoji}
    </div>
  );
}
