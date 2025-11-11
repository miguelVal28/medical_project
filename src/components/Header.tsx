"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

type HeaderProps = {
  profileName?: string;
  profileInitial?: string;
  profileEmail?: string;
};

export default function Header({
  profileName,
  profileInitial,
  profileEmail,
}: HeaderProps) {
  const { data: session } = useSession();

  // Determine what to display for the user
  const displayName = profileName || session?.user?.email || "User";
  const initial =
    profileInitial ||
    (session?.user?.email ? session.user.email.charAt(0).toUpperCase() : "U");

  return (
    <header className="bg-white dark:bg-slate-800 shadow">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between items-center">
          <div className="flex-shrink-0 flex items-center">
            <div className="h-8 w-8 bg-blue-600 rounded-md flex items-center justify-center mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              MediCare Connect
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <button className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out">
                <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                  {initial}
                </div>
              </button>
            </div>
            <span className="text-gray-700 dark:text-gray-300">
              {displayName}
            </span>
            <Link
              href="/login"
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            >
              Sign Out
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
