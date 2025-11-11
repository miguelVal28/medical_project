"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  //Toggle the sidebar state
  function toggleSidebar() {
    return setSidebarExpanded(!sidebarExpanded);
  }

  const contentWidthClass = sidebarExpanded ? "md:ml-64" : "ml-16";

  return (
    <div className="flex min-h-screen">
      <Sidebar isExpanded={sidebarExpanded} onToggle={toggleSidebar} />
      <div
        className={`flex flex-col flex-1 transition-all duration-300 ease-in-out ${contentWidthClass}`}
      >
        <Header />
        <main id="main-layout" className="flex-1">
          <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
            <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
