// features/auth/components/LoginForm.tsx

"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    if (email && password) {
      if (email === "ngocquy23@forcs.io" && password === "123") {
        toast.success("Login successful", { duration: 3000 });
        const user = { email: email, password: password };
        document.cookie = `user=${encodeURIComponent(
          JSON.stringify(user)
        )}; path=/; max-age=86400`;
        router.push("/dashboard");
      } else {
        toast.error("Invalid email or password", { duration: 5000 });
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
        value={email}
        onChange={(e) => setEmail(e.target.value)}
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
