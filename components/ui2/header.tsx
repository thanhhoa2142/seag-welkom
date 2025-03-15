import Link from "next/link";
import EmojiAvatar from "./emoji-avatar";
import Image from "next/image";

interface PageHeaderProps {
  heading: string;
  text?: string;
  children?: React.ReactNode;
}

const mockUser = {
  name: "AAAA",
  profilePicture:
    "https://lh5.googleusercontent.com/p/AF1QipMBwsYfFhzSaKZ-E4yOioJB834E5tDZl3FO2YP-=w408-h408-k-no",
};

const mockWeather = [
  { day: "Mon", time: "02:27 PM", type: "rainy" },
  { day: "Tue", time: "06:00 AM", type: "cloudy" },
  { day: "Wed", time: "07:30 PM", type: "sunny" },
  { day: "Thu", time: "12:00 PM", type: "rainy-sunny" },
  { day: "Fri", time: "04:00 PM", type: "rainy" },
  { day: "Sat", time: "08:00 AM", type: "sunny" },
];

export function PageHeader({ children }: PageHeaderProps) {
  return (
    <div className="flex flex-col px-4 py-2 bg-white border-b">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <EmojiAvatar name="rinx1000" />
          <div>
            <p className="text-xs text-gray-500">Good Morning,</p>
            <p className="font-medium text-gray-900 -mt-1">{mockUser.name}</p>
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
      <div>
        <ul className="flex gap-4 justify-around items-center mb-4 -mx-4 p-2 rounded-lg bg-gray-100">
          {mockWeather.map((weather, index) => (
            <li
              key={index}
              className="flex flex-col items-center text-center min-w-fit"
            >
              <Image
                src={`/weather/${weather.type}.svg`}
                width={24}
                height={24}
                alt={`Weather ${weather.type}`}
                className="w-6 h-6 text-yellow-500"
              />
              <p className="text-xs mt-2 font-semibold text-gray-500">
                {weather.day}
              </p>
              <p className="text-[10px] text-gray-500">{weather.time}</p>
            </li>
          ))}
        </ul>
      </div>

      {children}
    </div>
  );
}
