import { GetLocationByIdReturnType } from "@/app/actions/challenges";
import Image from "next/image";
import { Star } from "lucide-react";

export default function ChallengeItem({
  location,
  className,
}: {
  location: NonNullable<GetLocationByIdReturnType>;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "block cursor-pointer rounded-lg bg-emerald-700/10 hover:bg-gray-100 pt-0 overflow-hidden",
        className
      )}
    >
      <Image
        src={location.photoUrl || ""}
        alt={location.name}
        width={400}
        height={200}
        className="w-full h-32 object-cover"
      />
      <div className="pt-1.5 pb-4 px-3">
        <header className="flex justify-between items-center">
          <h3 className="font-semibold">{location.name}</h3>
          <div className="flex items-center space-x-1">
            <span className="flex items-center rounded-full bg-yellow-500 p-px">
              <Star
                className="h-4 w-4 text-white"
                fill="currentColor"
                stroke="none"
              />
            </span>
            <strong className="text-gray-800">
              {location.tasks.reduce((acc, t) => acc + t.points, 0)}
            </strong>
          </div>
        </header>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {location.description}
        </p>
      </div>
    </div>
  );
}
