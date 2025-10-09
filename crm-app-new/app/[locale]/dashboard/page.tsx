// app/dashboard/layout.tsx
// 'use client'
import { useTranslations } from "next-intl";

export default function DashboardLayout() {
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
