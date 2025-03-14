"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Home,
  UserCircle,
  LucideIcon,
  Rocket,
  MessageCircleMoreIcon,
} from "lucide-react";

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
    icon: Rocket,
  },
  {
    href: "/chat",
    label: "Chat",
    icon: MessageCircleMoreIcon,
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
            className={`flex flex-col items-center ${
              pathname === href ? "text-blue-600" : "text-gray-500"
            }`}
          >
            <Icon
              size={24}
              className={pathname === href ? "fill-current/20" : ""}
            />
            <span className="text-xs mt-1">{label}</span>
          </Link>
        ))}
      </nav>
    </footer>
  );
}
