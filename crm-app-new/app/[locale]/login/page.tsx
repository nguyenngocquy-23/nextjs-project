// app/(auth)/login/page.tsx

import LoginForm from "@/features/auth/components/LoginForm";

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center w-screen h-screen bg-gray-50 dark:bg-gray-900">
      <LoginForm />
    </main>
  );
}
