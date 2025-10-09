// app/dashboard/layout.tsx
// 'use client'
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { useTranslations } from "next-intl";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const cookieStore = await cookies();
  // const user = cookieStore.get("user");

  // if (!user) {
  //   redirect("/login");
  // }
  const t = useTranslations("Dashboard");
  return (
    <div className="flex">
      <p className="text-4xl text-red-400">{t("title")}</p>
    </div>
  );
}
