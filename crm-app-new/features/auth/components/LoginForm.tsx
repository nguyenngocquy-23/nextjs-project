// features/auth/components/LoginForm.tsx

"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { login } from "@/services/auth";
import { useAuthStore } from "@/stores/useAuthStore";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    if (username && password) {
      try {
        const data = await login(); // gọi API dummyjson
        console.log("✅ Login data:", data);

        // Lưu token và user vào Zustand
        useAuthStore
          .getState()
          .setAuth(data.token, { id: data.id, username: data.username });

        toast.success("Login successful!");
        router.push("/dashboard");
      } catch (error) {
        toast.error("Login failed.");
        console.error(error);
      }
    }
  };
  return (
    <form className="w-[50vw] space-y-4 bg-white dark:bg-gray-800 p-6 rounded shadow-xl">
      <h2 className="text-4xl font-semibold text-gray-800 dark:text-gray-100 text-center">
        Login
      </h2>
      <Input
        type="email"
        placeholder="Email"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button type="submit" className="w-full" onClick={handleLogin}>
        Sign In
      </Button>
    </form>
  );
}
