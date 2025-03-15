import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Settings2, Star } from "lucide-react";
import { categoryTitleMap, pointToGetBadge } from "@/lib/constants";
import EmojiAvatar from "@/components/ui2/emoji-avatar";
import { prisma, thisUser } from "@/lib/db";
import { LocationTag } from "@prisma/client";
import { PageContainer } from "@/components/ui2/page-container";

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
    <PageContainer className="w-full flex flex-col items-center p-4 space-y-6">
      {/* User Profile Section */}
      <div className="w-full">
        <div className="flex items-center space-x-4">
          <EmojiAvatar name={user.username} />
          <div>
            <strong>{user.username}</strong>
            {user.bio && (
              <p className="text-gray-600 text-center text-sm -mt-0.5">
                {user.bio}
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

        <ul className="flex space-x-2 mt-4">
          {Object.entries(categoryTitleMap).map(([tag, title]) =>
            pointOfEachTag[tag as LocationTag] > pointToGetBadge ? (
              <li
                key={tag}
                className="flex flex-col items-center bg-gray-100 text-gray-600 text-xs p-2 rounded-lg min-w-20 font-medium"
              >
                <Image
                  src={`/badges/${tag}.svg`}
                  alt={title}
                  width={32}
                  height={32}
                />
                {title.slice(2)}
              </li>
            ) : null
          )}
        </ul>
      </div>

      <section className="w-full">
        <h2 className="text-lg font-semibold">About me</h2>
        <p className="text-gray-600 text-sm">
          {user.bio ??
            "Fill up your bio to let others know how cool are you 😎"}
        </p>
      </section>

      {/* Store Section */}
      <div className="w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Store</h2>
          <p className="text-sm text-gray-600">
            My Point: <Star className="inline size-5 text-yellow-500" />{" "}
            {currentPoint}
          </p>
          <a href="#" className="text-sm text-gray-500">
            See All
          </a>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {rewards.map((reward) => (
            <div key={reward.id} className="p-2">
              <div className="mb-1">
                <Image
                  src={reward.photoUrl}
                  alt={reward.name}
                  width={300}
                  height={300}
                  objectFit="cover"
                  className="rounded-md"
                />
              </div>
              <h4 className="text-sm font-medium truncate text-center">
                {reward.name}
              </h4>
              <p className="text-s text-center text-gray-500">
                <Star className="inline h-3 w-3 text-yellow-500" />
                {reward.pointsRequired}
              </p>
              <Button variant="default" className="mt-1 w-full py-1 text-xs">
                Exchange
              </Button>
              <p className="text-[12px] text-gray-500 mt-1 text-center">
                {reward._count.userRewards} Exchanged
              </p>
            </div>
          ))}
        </div>
      </div>
    </PageContainer>
  );
}
