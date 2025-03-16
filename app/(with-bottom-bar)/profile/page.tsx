import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Info, QrCode, Settings2 } from "lucide-react";
import {
  categoryBadges,
  categoryTitleMap,
  pointToGetBadge,
} from "@/lib/constants";
import EmojiAvatar from "@/components/ui2/emoji-avatar";
import { prisma, thisUser } from "@/lib/db";
import { LocationTag } from "@prisma/client";
import Link from "next/link";
import Point from "@/components/ui2/point";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default async function ProfilePage() {
  const user = await thisUser;
  if (!user) return <div>Not found</div>;

  const [rewards, moreUserInfo] = await Promise.all([
    prisma.reward.findMany({
      orderBy: { pointsRequired: "asc" },
      include: { _count: { select: { userRewards: true } } },
    }),
    prisma.user.findFirst({
      where: { username: "rinx1000" },
      include: {
        // To calculate the points for each tag
        tasks: {
          select: {
            task: {
              select: { points: true, location: { select: { tags: true } } },
            },
          },
        },
        rewards: {
          select: { rewardId: true, isRedeemed: true, redeemedAt: true },
        },
      },
    }),
  ]);
  const { tasks, rewards: userRewards } = moreUserInfo!;
  let totalPoints = 0;
  const pointOfEachTag = tasks.reduce((acc, { task }) => {
    task.location.tags.forEach((tag) => {
      acc[tag] = (acc[tag] || 0) + task.points;
      totalPoints += task.points;
    });
    return acc;
  }, {} as Record<LocationTag, number>);
  const currentPoint = userRewards.reduce(
    (acc, { isRedeemed, rewardId }) =>
      acc -
      (isRedeemed ? rewards.find((r) => r.id === rewardId)!.pointsRequired : 0),
    totalPoints
  );

  return (
    <div className="overflow-auto">
      {/* User Profile Section */}
      <div className="w-full bg-slate-50 py-4 px-4 border-b border-slate-200">
        <div className="flex items-center space-x-4">
          <EmojiAvatar name={user.username} />
          <div>
            <strong>{user.username}</strong>
            {user.email && (
              <p className="text-gray-600 text-center text-xs -mt-0.5">
                {user.email}
              </p>
            )}
          </div>
          <Button
            size={"sm"}
            variant={"secondary"}
            className="rounded-full ml-auto bg-emerald-800/10 hover:bg-emerald-800/20 text-xs px-3"
          >
            Edit <Settings2 />
          </Button>
        </div>

        <ul className="flex justify-between gap-x-2 mt-4">
          {Object.entries(categoryTitleMap).map(([tag, title]) => {
            const pointsLeft =
              pointToGetBadge - pointOfEachTag[tag as LocationTag];
            const CustomBadge = categoryBadges[tag as LocationTag];

            return (
              <li
                key={tag}
                className={cn(
                  "relative flex flex-col gap-1 items-center bg-emerald-800/10 text-xs p-2 rounded-lg w-20 flex-1 font-medium",

                  pointsLeft <= 0 ? "text-emerald-800" : "grayscale"
                )}
              >
                {pointsLeft <= 0 ? (
                  <CheckCircle2 className="absolute -top-1.5 -right-1.5 h-6 w-6 fill-emerald-800 text-white" />
                ) : (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="absolute -top-1.5 -right-1.5 h-6 w-6 fill-emerald-800 text-white" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="flex items-center gap-1 text-xs">
                          You nearly get this.{" "}
                          {pointToGetBadge - pointOfEachTag[tag as LocationTag]}{" "}
                          <Point size={10} /> more to achieve this badge.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
                <CustomBadge className="h-8 w-8" />
                {title.slice(2)}
              </li>
            );
          })}
        </ul>
      </div>

      <section className="w-full flex justify-between items-start p-4 mt-4 border-b border-slate-200">
        <div>
          <h2 className="text-lg font-bold">About me</h2>
          <p className="text-gray-600 text-sm">
            {user.bio ??
              "Fill up your bio to let others know how cool are you 😎"}
          </p>
        </div>
        <Button variant={"outline"} size={"icon"} asChild>
          <Link href="/friend-suggestions">
            <QrCode className="h-4 w-4" />
          </Link>
        </Button>
      </section>

      {/* Store Section */}
      <div className="w-full p-4">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-lg font-bold">Store</h2>
            <p className="flex items-center gap-1 text-base text-gray-600 font-semibold">
              My Point: <Point size={16} /> <strong>{currentPoint}</strong>
            </p>
          </div>
          <Link href="#" className="text-sm text-gray-500">
            See All
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {rewards.map((reward) => (
            <div key={reward.id} className="p-2 bg-accent rounded-md">
              <div className="mb-1 relative rounded-md h-28 w-full bg-white">
                <Image
                  src={reward.photoUrl}
                  alt={reward.name}
                  fill
                  className="object-contain w-full h-full"
                />
              </div>
              <h4 className="text-sm font-medium truncate text-center">
                {reward.name}
              </h4>
              <p className="text-sm text-center text-gray-500 flex justify-center items-center gap-1">
                <Point size={12} />
                {reward.pointsRequired}
              </p>
              <Button variant="default" className="w-full py-1 text-xs mt-2">
                Exchange
              </Button>
              <p className="text-[12px] text-gray-500 mt-1 text-center">
                {reward._count.userRewards} Exchanged
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
