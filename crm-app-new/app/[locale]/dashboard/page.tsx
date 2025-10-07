// app/dashboard/layout.tsx
// 'use client'
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const cookieStore = await cookies();
  // const user = cookieStore.get("user");

  // if (!user) {
  //   redirect("/login");
  // }
  return (
    <div className="flex">
      <p className="text-4xl text-red-400">Hello my friend</p>
    </div>
  );
}
