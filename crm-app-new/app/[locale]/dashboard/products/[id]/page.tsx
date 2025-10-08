"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Product } from "@/type";
import { useProducts, useUpdateProduct } from "@/hooks/useProducts";

const ProductSchema = z.object({
  title: z.string().min(2, "Name is required"),
  price: z.coerce.number().min(0, "Price must be positive"),
  stock: z.coerce.number().min(0, "Stock must be positive"),
});

type ProductFormData = z.infer<typeof ProductSchema>;

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [product, setProduct] = useState<Product | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<ProductFormData>({
    resolver: zodResolver(ProductSchema) as never,
    defaultValues: {
      title: "",
      price: 0,
      stock: 0,
    },
  });

  const { data, isLoading } = useProducts();
  const { mutate, isPending } = useUpdateProduct();

  // ✅ Khi data có, tìm product theo ID
  useEffect(() => {
    if (data?.products) {
      const found = data.products.find((p) => p.id === Number(id));
      if (found) {
        setProduct(found);
        form.reset({
          title: found.title,
          price: found.price,
          stock: found.stock,
        });
      } else {
        toast.error("Product not found");
        router.back();
      }
    }
  }, [data, id, form, router]);

  const onSubmit = (formData: ProductFormData) => {
    if (!product) return;

    const updatedProduct = {
      ...product,
      ...formData,
      updatedAt: new Date().toISOString(),
    };

    console.log('updatedProduct', updatedProduct)

    mutate(updatedProduct, {
      onSuccess: (res) => {
        toast.success("Product updated successfully!");
        setProduct(res);
        setIsEditing(false);
      },
      onError: () => toast.error("Failed to update product."),
    });
  };

  if (isLoading || !product) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <button
        onClick={() => router.back()}
        className="inline-flex items-center gap-1 text-sm text-blue-600 font-medium hover:text-blue-800 transition-colors group"
      >
        <span className="group-hover:-translate-x-1 transition-transform">←</span>
        Back to Products
      </button>

      <h1 className="text-3xl font-semibold mt-6 mb-4 text-gray-800">
        Product Detail
        <span className="text-gray-500 font-normal"> — {product.title}</span>
      </h1>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        {!isEditing ? (
          <div className="space-y-3 text-gray-700">
            <div className="grid grid-cols-2 gap-y-2">
              <p className="font-medium text-gray-500">ID:</p>
              <p>{product.id}</p>

              <p className="font-medium text-gray-500">Title:</p>
              <p>{product.title}</p>

              <p className="font-medium text-gray-500">Price:</p>
              <p>${product.price.toFixed(2)}</p>

              <p className="font-medium text-gray-500">Stock:</p>
              <p>{product.stock}</p>
            </div>

            <button
              onClick={() => setIsEditing(true)}
              className="mt-4 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 active:scale-95 transition-all"
            >
              Edit Product
            </button>
          </div>
        ) : (
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5 max-w-md"
          >
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Title
              </label>
              <input
                {...form.register("title")}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {form.formState.errors.title && (
                <p className="text-red-500 text-sm mt-1">
                  {form.formState.errors.title.message}
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
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                disabled={isPending}
                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 active:scale-95 transition-all"
              >
                {isPending ? "Saving..." : "Save Changes"}
              </button>

              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 active:scale-95 transition-all"
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
