"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // tránh lỗi hydration khi render lần đầu
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-all"
    >
      {theme === "light" ? (
        <Moon className="w-5 h-5 text-gray-700" />
      ) : (
        <Sun className="w-5 h-5 text-yellow-400" />
      )}
    </button>
  );
}
