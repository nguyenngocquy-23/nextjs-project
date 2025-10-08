"use client";

import { useForm } from "react-hook-form";
import { Product } from "@/type";
import { useAddProduct } from "@/hooks/useProducts";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function AddProductForm() {
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm<Product>();
  const { mutate, isPending, isSuccess, data } = useAddProduct();

  const onSubmit = (formData: Product) => {
    mutate(formData, {
      onSuccess: () => {
        toast.success("Product added successfully!");
        reset();
      },
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-2xl mt-6">
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
      <h2 className="text-2xl font-semibold mb-4">Add New Product</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium">Title</label>
            <input
              {...register("title", { required: true })}
              className="border rounded w-full p-2"
            />
          </div>

          <div>
            <label className="block font-medium">Category</label>
            <input
              {...register("category")}
              className="border rounded w-full p-2"
            />
          </div>

          <div>
            <label className="block font-medium">Brand</label>
            <input
              {...register("brand")}
              className="border rounded w-full p-2"
            />
          </div>

          <div>
            <label className="block font-medium">Price</label>
            <input
              type="number"
              {...register("price", { valueAsNumber: true })}
              className="border rounded w-full p-2"
            />
          </div>

          <div>
            <label className="block font-medium">Discount (%)</label>
            <input
              type="number"
              {...register("discountPercentage", { valueAsNumber: true })}
              className="border rounded w-full p-2"
            />
          </div>

          <div>
            <label className="block font-medium">Stock</label>
            <input
              type="number"
              {...register("stock", { valueAsNumber: true })}
              className="border rounded w-full p-2"
            />
          </div>

          <div>
            <label className="block font-medium">Rating</label>
            <input
              type="number"
              step="0.1"
              {...register("rating", { valueAsNumber: true })}
              className="border rounded w-full p-2"
            />
          </div>

          <div>
            <label className="block font-medium">SKU</label>
            <input {...register("sku")} className="border rounded w-full p-2" />
          </div>

          <div>
            <label className="block font-medium">Weight (g)</label>
            <input
              type="number"
              {...register("weight", { valueAsNumber: true })}
              className="border rounded w-full p-2"
            />
          </div>

          <div>
            <label className="block font-medium">Return Policy</label>
            <input
              {...register("returnPolicy")}
              className="border rounded w-full p-2"
            />
          </div>
        </div>

        <div>
          <label className="block font-medium">Description</label>
          <textarea
            {...register("description")}
            className="border rounded w-full p-2 h-24"
          />
        </div>

        <div>
          <label className="block font-medium">Shipping Information</label>
          <textarea
            {...register("shippingInformation")}
            className="border rounded w-full p-2 h-20"
          />
        </div>

        <div>
          <label className="block font-medium">Warranty Information</label>
          <textarea
            {...register("warrantyInformation")}
            className="border rounded w-full p-2 h-20"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {isPending ? "Adding..." : "Add Product"}
        </button>
      </form>

      {isSuccess && (
        <pre className="mt-4 bg-gray-100 p-2 rounded text-sm">
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
}
