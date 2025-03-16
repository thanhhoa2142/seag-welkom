import Link from "next/link";
import EmojiAvatar from "./emoji-avatar";
import Image from "next/image";
import { Ellipsis } from "lucide-react";
import { Button } from "../ui/button";
import { thisUser } from "@/lib/db";

const mockWeather = [
  { day: "Mon", time: "02:27 PM", type: "rainy" },
  { day: "Tue", time: "06:00 AM", type: "cloudy" },
  { day: "Wed", time: "07:30 PM", type: "sunny" },
  { day: "Thu", time: "12:00 PM", type: "rainy-sunny" },
  { day: "Fri", time: "04:00 PM", type: "rainy" },
];

export async function PageHeader() {
  const user = await thisUser;
  if (!user) return null;

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <EmojiAvatar name={user.username} />
          <div>
            <p className="text-xs text-gray-500">Good Morning,</p>
            <p className="font-medium text-gray-900 -mt-1">{user.username}</p>
          </div>
        </div>
        <Link
          href="/chatbot"
          className="flex items-center gap-1 bg-blue-100 rounded-full px-3 py-1.5 hover:bg-blue-200 transition"
        >
          <span className="text-sm font-medium">Meet Kom</span>
          <Image
            src={"/chatbot.png"}
            width={24}
            height={24}
            alt="Chatbot"
            className="-mt-0.5"
          />
        </Link>
      </div>

      {/* Weather Forecast */}
      <div className="mb-4 px-2 py-3 rounded-lg bg-accent">
        <div className="flex justify-between items-start gap-2">
          <div>
            <h2 className="ml-2 font-medium">Great day to explore</h2>
            <p className="ml-2 mb-3 -mt-0.5 text-sm text-gray-600">Melbourne</p>
          </div>
          <Button variant={"ghost"} size={"icon"}>
            <Ellipsis className="!size-5" />
          </Button>
        </div>
        <ul className="flex gap-4 justify-around items-center">
          {mockWeather.map((weather, index) => (
            <li
              key={index}
              className="flex flex-col items-center text-center min-w-fit"
            >
              <Image
                src={`/weather/${weather.type}.svg`}
                width={32}
                height={32}
                alt={`Weather ${weather.type}`}
                className="w-6 h-6 text-yellow-500 "
              />
              <p className="text-xs mt-2 font-semibold">{weather.day}</p>
              <p className="text-[10px] text-gray-500 -mt-0.5">
                {weather.time}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
