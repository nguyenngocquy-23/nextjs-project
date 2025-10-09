import { Locale } from "next-intl";
import { ChangeEvent, useTransition } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useParams, usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { routing } from "@/i18n/routing";

type Props = {
  defaultValue?: string;
  items?: Array<{ value: string; label: string }>;
  label?: string;
};

export default function LocaleSwitcherSelect({
  defaultValue,
  items,
  label,
}: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();

  function onSelectChange(nextLocale: string) {
    startTransition(() => {
      // Loại bỏ locale hiện tại khỏi pathname
      const pathWithoutLocale = pathname.replace(
        /^\/(en|vi)(\/|$)/, // regex khớp /en hoặc /vi đầu URL
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
  );
}
