// app/dashboard/products/page.tsx

import ProductTable from "@/features/products/ProductTable";
import { useTranslations } from "next-intl";

export default function ProductsPage() {
  const tTitle = useTranslations("Product");

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">{tTitle("title")}</h1>
      <ProductTable />
    </div>
  );
}
