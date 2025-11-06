"use client";

import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";

// Pages that should not show the sidebar
const authPages = ["/login", "/register", "/forgot-password"];

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const showSidebar = !authPages.includes(pathname);

  return (
    <div className="flex min-h-screen">
      {showSidebar && <Sidebar />}
      <main
        className={`flex-1 ${
          showSidebar ? "ml-16 md:ml-64" : ""
        } transition-margin duration-300 ease-in-out`}
      >
        {children}
      </main>
    </div>
  );
}
