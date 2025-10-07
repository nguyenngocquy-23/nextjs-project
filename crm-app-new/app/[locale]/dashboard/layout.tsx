// app/dashboard/layout.tsx

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const user = cookieStore.get("user");

  if (!user) {
    redirect("/login");
  }
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="flex-1 p-4 bg-gray-50 dark:bg-gray-900">
          {children}
        </main>
      </div>
    </div>
  );
}
