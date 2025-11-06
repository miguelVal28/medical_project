"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <div className="p-8">Loading...</div>;
  }

  if (!session) {
    router.push('/login');
    return null;
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800 p-8">
      <div className="max-w-6xl mx-auto bg-white dark:bg-slate-900 rounded-xl shadow-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Sign out
          </button>
        </div>

        <div className="bg-blue-50 dark:bg-slate-800 p-4 rounded-lg mb-6">
          <p className="text-gray-800 dark:text-gray-200">
            Welcome, {session?.user?.email || "User"}!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Sample dashboard cards */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Patient Records
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Access and manage patient records
            </p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Appointments
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Schedule and manage appointments
            </p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Settings
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Configure your account settings
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
