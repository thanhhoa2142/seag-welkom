import { getMyPointsOfLocationTag } from "@/app/actions/tasks";
import { Button } from "@/components/ui/button";
import Point from "@/components/ui2/point";
import {
  categoryBadges,
  categoryUiAttributeMap,
  categoryTitleMap,
  pointToGetBadge,
} from "@/lib/constants";
import Link from "next/link";
import { LocationTag } from "@prisma/client";

export default async function Badges() {
  const locationTags = Object.entries(LocationTag);
  const myPoints = await Promise.all(
    locationTags.map(([, tag]) => getMyPointsOfLocationTag(tag))
  );

  const filteredLocationTags = locationTags
    .map(([, tag], index) => {
      const diff = myPoints[index] - pointToGetBadge;
      if (diff < 0) return { tag, point: myPoints[index] };
    })
    .filter(Boolean)
    .slice(0, 2);

  return (
    <div className="space-y-2">
      <header className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-semibold text-gray-900">Activities</h2>

        <Link href="/profile">
          <Button variant={"secondaryGreen"} size={"sm"}>
            See all
          </Button>
        </Link>
      </header>

      <ul className="grid gap-2">
        {filteredLocationTags.map((item) => {
          const { point, tag } = item!;
          const CustomBadge = categoryBadges[tag];
          const { color, description } = categoryUiAttributeMap[tag];

          const percentage = (point / pointToGetBadge) * 100;

          return (
            <li key={tag} className="w-full bg-accent rounded-md p-2">
              <div className="flex items-center space-x-4">
                {/* Banner Image */}
                <div
                  className="rounded-lg p-2"
                  style={{ backgroundColor: `${color}10` }}
                >
                  <CustomBadge className="size-14" />
                </div>
                {/* Challenge Details */}
                <div className="flex-1">
                  <h3 className="font-semibold leading-5">
                    {categoryTitleMap[tag].slice(2)}
                  </h3>
                  <span className="inline-flex items-center gap-1 font-semibold text-sm">
                    <Point size={12} />
                    {point}
                  </span>
                  <p className="text-xs leading-3.5 text-gray-500 line-clamp-2">
                    {description}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <div
                  className={cn(
                    "flex-1 relative h-2 w-full overflow-hidden rounded-full"
                  )}
                  style={{
                    backgroundColor: `${color}20`,
                  }}
                >
                  <div
                    data-slot="progress-indicator"
                    className="h-full w-full flex-1 transition-all"
                    style={{
                      backgroundColor: `${color}`,
                      transform: `translateX(-${100 - (percentage || 0)}%)`,
                    }}
                  />
                </div>
                <span className="text-xs font-medium">
                  {formatNumber(percentage)}%
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
