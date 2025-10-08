// app/dashboard/products/page.tsx

import ProductTable from "@/features/products/ProductTable";

export default function ProductsPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Products</h1>
      <ProductTable/>
    </div>
  );
}
