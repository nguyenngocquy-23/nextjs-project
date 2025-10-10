// features/auth/components/LoginForm.tsx

'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { login } from '@/services/auth';
import { useAuthStore } from '@/stores/useAuthStore';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { toast } from 'sonner';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    if (username && password) {
      try {
        const data = await login(); // gọi API dummyjson
        console.log('✅ Login data:', data);

        // Lưu token và user vào Zustand
        useAuthStore
          .getState()
          .setAuth(data.token, { id: data.id, username: data.username });

        toast.success('Login successful!');
        router.push('/dashboard');
      } catch (error) {
        toast.error('Login failed.');
        console.error(error);
      }
    }
  };
  return (
    <div className="relative flex h-screen w-screen items-center justify-center">
      <form className="w-[50vw] space-y-4 rounded bg-white p-6 shadow-xl dark:bg-gray-800">
        <h2 className="text-center text-4xl font-semibold text-gray-800 dark:text-gray-100">
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
      <div className="absolute right-1 top-1 mx-auto max-w-sm transform overflow-hidden rounded-xl bg-white shadow-lg transition duration-500 hover:scale-105 hover:shadow-2xl dark:bg-gray-900">
        <div className="relative">
          {/* <img className="w-full h-60 object-cover transition-transform duration-300 ease-in-out hover:scale-110" src="https://source.unsplash.com/400x300/?product,tech" alt="Product Image"> */}
          <span className="absolute right-2 top-2 rounded bg-green-500 px-2 py-1 text-xs font-semibold text-white shadow">
            New
          </span>
        </div>
        <div className="p-5">
          <h2 className="mb-2 text-lg font-bold text-gray-800 dark:text-white">
            Tai nghe không dây Pro X2
          </h2>
          <p className="mb-4 text-sm text-gray-600 dark:text-gray-300">
            Âm thanh chất lượng cao, chống ồn chủ động, thời lượng pin lên tới
            40 giờ.
          </p>
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
              $199
            </span>
            <button className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white shadow transition-all duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900">
              Mua ngay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
