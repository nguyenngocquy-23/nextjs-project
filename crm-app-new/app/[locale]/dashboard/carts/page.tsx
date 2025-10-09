"use client";

import { useGetOverCart } from "@/hooks/useCart";
import { CartItem } from "@/type";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { toast } from "sonner";

export default function CartPage() {
  const router = () => {
    toast.error("Chức năng đang phát triển");
  }
  const { data, isLoading, isError } = useGetOverCart();

  const tCart = useTranslations("Cart");

  if (isLoading) return <p className="p-4">Loading cart...</p>;
  if (isError)
    return <p className="p-4 text-red-500">Failed to load cart data.</p>;

  // API trả về dạng { carts: [...], total, skip, limit }
  const carts = data?.carts ?? [];
  const cart = carts[0]; // userId = 1, ví dụ

  if (!cart) return <p className="p-4">No cart found.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-4">{tCart("title")}</h1>

      <div className="bg-white rounded-2xl shadow-sm border p-4">
        {cart.products.map((item: CartItem) => (
          <div
            key={item.id}
            className="flex items-center justify-between border-b p-3 rounded-md last:border-none hover:cursor-pointer hover:-translate-y-2 hover:shadow-md duration-300"
            onClick={router}
          >
            <div className="flex items-center gap-4">
              <Image
                src={item.thumbnail || "/placeholder.png"}
                alt={item.title}
                width={64}
                height={64}
                className="rounded-lg border"
              />
              <div>
                <p className="font-medium">{item.title}</p>
                <p className="text-gray-500 text-sm">
                  ${item.price} × {item.quantity}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold">${item.total}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 text-right">
        {/* <p className="text-lg font-medium">
          Total Items: <span className="font-semibold">{cart.totalProducts}</span>
        </p> */}
        <p className="text-xl font-bold text-blue-600">
          {tCart("total")}: ${cart.discountedTotal}
        </p>
      </div>
    </div>
  );
}
