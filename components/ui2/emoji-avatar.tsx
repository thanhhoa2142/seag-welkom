import { getAvatarAttributes } from "@/lib/utils";

export default function EmojiAvatar({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const avatar = getAvatarAttributes(name);
  return (
    <div
      className={cn(
        "size-12 text-3xl inline-flex items-center justify-center rounded-full",
        className
      )}
      style={{ backgroundColor: `${avatar.color}30` }}
    >
      {avatar.emoji}
    </div>
  );
}
