"use client";
import { useParams, useRouter } from "next/navigation";

export function useLocalizedRouter() {
  const router = useRouter();
  const params = useParams();

  const push = (path: string) => {
    const locale = params.locale as string;
    router.push(`/${locale}${path.startsWith("/") ? path : `/${path}`}`);
  };

  const replace = (path: string) => {
    const locale = params.locale as string;
    router.replace(`/${locale}${path.startsWith("/") ? path : `/${path}`}`);
  };

  return { push, replace };
}
