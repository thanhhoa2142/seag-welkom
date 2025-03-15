"use client";

import Link from "next/link";
import {
  Sun,
  CloudRain,
  CloudSun,
  CloudLightning,
  MessageCircle,
} from "lucide-react";
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
  { day: "Mon", time: "02:27 PM", Icon: CloudLightning },
  { day: "Tue", time: "06:00 AM", Icon: CloudSun },
  { day: "Wed", time: "07:30 PM", Icon: Sun },
  { day: "Thu", time: "12:00 PM", Icon: CloudRain },
  { day: "Fri", time: "04:00 PM", Icon: Sun },
];

export function PageHeader({ heading, text, children }: PageHeaderProps) {
  const [mainHeading, subHeading] = heading.split("|");

  return (
    <div className="flex flex-col px-4 py-2 bg-white border-b">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Image
            src={mockUser.profilePicture}
            alt="User"
            className="w-10 h-10 rounded-full"
            width={40}
            height={40}
          />
          <div>
            <p className="text-sm text-gray-500">Good Morning,</p>
            <p className="text-base font-medium text-gray-900">
              {mockUser.name}
            </p>
          </div>
        </div>
        <Link
          href="/chatbot"
          className="flex items-center gap-2 bg-blue-100 rounded-full px-3 py-2 hover:bg-blue-200 transition"
        >
          <MessageCircle />
          <span className="text-sm font-medium text-blue-700">WelkomBOT</span>
        </Link>
      </div>

      {/* Heading */}
      <h1 className="text-2xl font-bold text-gray-900 mb-2">
        {mainHeading}
        {subHeading && (
          <span className="block text-base text-gray-500 font-normal">
            {subHeading}
          </span>
        )}
      </h1>

      {/* Weather Forecast */}
      <div className="flex gap-4 items-center justify-start mb-4">
        {mockWeather.map((weather, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            <weather.Icon className="w-6 h-6 text-yellow-500" />
            <p className="text-xs text-gray-500">{weather.day}</p>
            <p className="text-xs text-gray-500">{weather.time}</p>
          </div>
        ))}
      </div>

      {text && <p className="text-base text-gray-500 mb-2">{text}</p>}
      {children}
    </div>
  );
}
