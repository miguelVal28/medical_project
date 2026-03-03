"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  PersonIcon,
  PersonAddIcon,
  GearIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@primer/octicons-react";

interface SidebarItem {
  name: string;
  href: string;
  icon: React.ReactNode;
}

interface SidebarProps {
  isExpanded: boolean;
  onToggle: () => unknown;
}

export default function Sidebar({ isExpanded, onToggle }: SidebarProps) {
  const pathname = usePathname();

  const menuItems: SidebarItem[] = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: <HomeIcon />,
    },
    {
      name: "Patients",
      href: "/patients/lookup",
      icon: <PersonAddIcon />,
    },
    {
      name: "Profile",
      href: "/profile",
      icon: <PersonIcon />,
    },

    {
      name: "Settings",
      href: "/settings",
      icon: <GearIcon />,
    },
    // Add more menu items as needed
  ];

  return (
    <div
      className={`${
        isExpanded ? "w-64" : "w-16"
      } fixed h-full bg-white dark:bg-gray-900 border-r dark:border-gray-800 transition-width duration-300 ease-in-out z-10`}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-800">
          {isExpanded && <h1 className="text-lg font-semibold">Medical App</h1>}
          <button
            onClick={() => onToggle()}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
          >
            {!isExpanded ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </button>
        </div>

        <nav className="flex-1 p-2 overflow-y-auto">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center p-2 rounded-md ${
                    pathname === item.href
                      ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800"
                  } transition-colors`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {isExpanded && <span>{item.name}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
