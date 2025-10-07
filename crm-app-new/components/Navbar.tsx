// components/Navbar.tsx
"use client";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { ThemeSwitcher } from "./ThemeSwitcher";

export default function Navbar() {
  const [title, setTitle] = useState("Dashboard");
  const router = useRouter();
  const pathname = usePathname();
  const handleLogout = () => {
    document.cookie = "user=; path=/; max-age=0";
    console.log("Logged out");
    router.push("/login");
  };

  useEffect(() => {
    const pageName = () => {
      const parts = pathname.split("/");
      return Number(parts[parts.length - 1])
        ? parts[parts.length - 2] || ""
        : parts[parts.length - 1] || "";
    };
    const name = pageName();
    setTitle(name.charAt(0).toUpperCase() + name.slice(1));
  }, [pathname]);

  return (
    <header className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 flex items-center justify-between">
      <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        {title}
      </h1>
      <div className="flex items-center gap-3">
        <div className="flex items-center">
          {/* Locale switcher (i18n) bạn sẽ thêm sau) */}
          <ThemeSwitcher />
        </div>
        <Button onClick={() => handleLogout()}>Logout</Button>
      </div>
    </header>
  );
}
