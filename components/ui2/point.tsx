import { Star } from "lucide-react";

export default function Point({
  className,
  size = 16,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-yellow-500 p-0.5",
        className
      )}
    >
      <Star
        size={size}
        className="text-white"
        fill="currentColor"
        stroke="none"
      />
    </span>
  );
}
