import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Kiểu dữ liệu user
export type User = {
  id: number;
  username: string;
};

// Kiểu dữ liệu state
type AuthState = {
  token: string | null;
  user: User | null;
  setAuth: (token: string, user: User) => void;
  logout: () => void;
};

// Store zustand có persist để lưu vào localStorage
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      setAuth: (token, user) => set({ token, user }),
      logout: () => set({ token: null, user: null }),
    }),
    {
      name: 'auth-storage', // tên key lưu trong localStorage
    },
  ),
);
