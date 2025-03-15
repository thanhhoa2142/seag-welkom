import { getPopularLocations } from "@/app/actions/challenges";
import { Prisma } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";

export default function ChallengeItem({
  location,
}: {
  location: Prisma.PromiseReturnType<typeof getPopularLocations>[number];
}) {
  return (
    <Link
      href={`/challenges/${location.id}`}
      key={location.id}
      className="cursor-pointer rounded-lg bg-accent hover:bg-gray-100 pt-0 overflow-hidden"
    >
      <Image
        src={location.photoUrl || ""}
        alt={location.name}
        width={400}
        height={200}
        className="w-full h-32 object-cover"
      />
      <div className="pt-1.5 pb-4 px-2">
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
            <span>{location.tasks.reduce((acc, t) => acc + t.points, 0)}</span>
          </div>
        </header>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {location.description}
        </p>
      </div>
    </Link>
  );
}
