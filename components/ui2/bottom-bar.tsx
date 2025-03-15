"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Home,
  UserCircle,
  LucideIcon,
  MessageCircleMoreIcon,
  Flame,
  Handshake,
} from "lucide-react";
import Image from "next/image";

type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

const navItems: NavItem[] = [
  {
    href: "/",
    label: "Home",
    icon: Home,
  },
  {
    href: "/challenges",
    label: "Challenges",
    icon: Flame,
  },
  {
    href: "/chat",
    label: "Chat",
    icon: MessageCircleMoreIcon,
  },
  {
    href: "/friends",
    label: "Friends",
    icon: Handshake,
  },
  {
    href: "/profile",
    label: "Profile",
    icon: UserCircle,
  },
];

export default function BottomBar() {
  const pathname = usePathname();

  return (
    <footer className="w-full bg-white border-t">
      <nav className="flex justify-around py-2">
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={`flex-1 flex flex-col items-center ${
              pathname === href
                ? "text-green-700 font-semibold"
                : "text-gray-500"
            }`}
          >
            {label === "Chat" ? (
              <>
                <Image
                  src={"/chatbot.png"}
                  width={24}
                  height={24}
                  alt="Chatbot"
                  className="-mt-0.5"
                />
                <span className="text-xs text-blue-700 font-medium">
                  {label}
                </span>
              </>
            ) : (
              <>
                <Icon
                  size={20}
                  className={pathname === href ? "fill-current/20" : ""}
                />
                <span className="text-xs mt-0.5">{label}</span>
              </>
            )}
          </Link>
        ))}
      </nav>
    </footer>
  );
}
