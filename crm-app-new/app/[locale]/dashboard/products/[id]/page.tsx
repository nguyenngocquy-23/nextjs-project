"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Product } from "@/type";

// 🔹 Giả lập dữ liệu (tương tự trong trang list)
const fakeProducts = Array.from({ length: 100 }).map((_, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
  price: +(Math.random() * 100).toFixed(2),
  stock: Math.floor(Math.random() * 100),
}));

const ProductSchema = z.object({
  name: z.string().min(2, "Name is required"),
  price: z.coerce.number().min(0, "Price must be positive"),
  stock: z.coerce.number().min(0, "Stock must be positive"),
});

type ProductFormData = z.infer<typeof ProductSchema>;

export default function ProductDetailPage(listProducts: Product[]) {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [product, setProduct] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<ProductFormData>({
    resolver: zodResolver(ProductSchema) as never,
    defaultValues: {
      name: "",
      price: 0,
      stock: 0,
    },
  });

  useEffect(() => {
    const found = fakeProducts.find((p) => p.id === Number(id));
    if (found) {
      setProduct(found);
      form.reset(found);
    } else {
      toast.error("Product not found");
      router.back();
    }
  }, [id, form, router]);

  const onSubmit = (data: ProductFormData) => {
    toast.success("Product updated successfully!");
    setProduct({ ...product, ...data });
    setIsEditing(false);
  };

  if (!product) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-8 max-w-2xl mx-auto">
      {/* Back button */}
      <button
        onClick={() => router.back()}
        className="
      inline-flex items-center gap-1 text-sm text-blue-600 font-medium 
      hover:text-blue-800 transition-colors group
    "
      >
        <span className="group-hover:-translate-x-1 transition-transform">
          ←
        </span>
        Back to Products
      </button>

      {/* Header */}
      <h1 className="text-3xl font-semibold mt-6 mb-4 text-gray-800">
        Product Detail
        <span className="text-gray-500 font-normal"> — {product.name}</span>
      </h1>

      {/* Card container */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        {!isEditing ? (
          <div className="space-y-3 text-gray-700">
            <div className="grid grid-cols-2 gap-y-2">
              <p className="font-medium text-gray-500">ID:</p>
              <p>{product.id}</p>

              <p className="font-medium text-gray-500">Name:</p>
              <p>{product.name}</p>

              <p className="font-medium text-gray-500">Price:</p>
              <p>${product.price.toFixed(2)}</p>

              <p className="font-medium text-gray-500">Stock:</p>
              <p>{product.stock}</p>
            </div>

            <button
              onClick={() => setIsEditing(true)}
              className="
            mt-4 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg
            hover:bg-blue-700 active:scale-95 transition-all
          "
            >
              Edit Product
            </button>
          </div>
        ) : (
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5 max-w-md"
          >
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Name
              </label>
              <input
                {...form.register("name")}
                className="
              w-full border border-gray-300 rounded-lg px-3 py-2
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
            "
              />
              {form.formState.errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {form.formState.errors.name.message}
                </p>
              )}
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Price
              </label>
              <input
                type="number"
                step="0.01"
                {...form.register("price")}
                className="
              w-full border border-gray-300 rounded-lg px-3 py-2
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
            "
              />
              {form.formState.errors.price && (
                <p className="text-red-500 text-sm mt-1">
                  {form.formState.errors.price.message}
                </p>
              )}
            </div>

            {/* Stock */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Stock
              </label>
              <input
                type="number"
                {...form.register("stock")}
                className="
              w-full border border-gray-300 rounded-lg px-3 py-2
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
            "
              />
              {form.formState.errors.stock && (
                <p className="text-red-500 text-sm mt-1">
                  {form.formState.errors.stock.message}
                </p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                className="
              px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg
              hover:bg-blue-700 active:scale-95 transition-all
            "
              >
                Save Changes
              </button>

              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="
              px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg
              hover:bg-gray-50 active:scale-95 transition-all
            "
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
