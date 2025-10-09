import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { routing } from "@/i18n/routing";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";

export default function LocaleSwitcherSelect() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();

  function onSelectChange(nextLocale: string) {
    startTransition(() => {
      // Loại bỏ locale hiện tại khỏi pathname
      const pathWithoutLocale = pathname.replace(
        /^\/(en|vi|ko)(\/|$)/, // regex khớp /en hoặc /vi đầu URL
        "/"
      );
      router.replace(`/${nextLocale}${pathWithoutLocale}`);
    });
  }

  const listLanguage = routing.locales.map((locale) => ({
    value: locale,
    label: locale,
  }));

  const currentLocale = (params?.locale as string) || routing.defaultLocale;

  return (
    <div>
      <Select defaultValue={currentLocale} onValueChange={onSelectChange}>
        <SelectTrigger className="w-[90px]">
          <SelectValue placeholder={currentLocale.toUpperCase()} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {listLanguage.map((lang) => (
              <SelectItem key={lang.value} value={lang.value}>
                {lang.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {isPending && (
        <span className="ml-2 text-sm text-gray-500">Loading...</span>
      )}
    </div>
  );
}
