'use client';

import { useAddProduct } from '@/hooks/useProducts';
import { Product } from '@/type';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { AlertDialog } from '../../components/ui/alert-dialog';

export default function AddProductForm() {
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm<Product>();
  const { mutate, isPending, isSuccess, data } = useAddProduct();
  const tAddProduct = useTranslations('AddProduct');

  const onSubmit = (formData: Product) => {
    mutate(formData, {
      onSuccess: () => {
        toast.success('Product added successfully!');
        reset();
      },
    });
  };

  return (
    <div className="mx-auto mt-6 max-w-3xl rounded-2xl bg-white p-6 shadow">
      <AlertDialog></AlertDialog>
      <button
        onClick={() => router.push('/dashboard/products')}
        className="group inline-flex items-center gap-1 text-sm font-medium text-blue-600 transition-colors hover:text-blue-800"
      >
        <span className="transition-transform group-hover:-translate-x-1">
          ←
        </span>
        {tAddProduct('back')}
      </button>
      <h2 className="mb-4 text-2xl font-semibold">{tAddProduct('title')}</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium">
              {tAddProduct('i-title')}
            </label>
            <input
              {...register('title', { required: true })}
              className="w-full rounded border p-2"
            />
          </div>

          <div>
            <label className="block font-medium">
              {tAddProduct('i-category')}
            </label>
            <input
              {...register('category')}
              className="w-full rounded border p-2"
            />
          </div>

          <div>
            <label className="block font-medium">
              {tAddProduct('i-brand')}
            </label>
            <input
              {...register('brand')}
              className="w-full rounded border p-2"
            />
          </div>

          <div>
            <label className="block font-medium">
              {tAddProduct('i-price')}
            </label>
            <input
              type="number"
              {...register('price', { valueAsNumber: true })}
              className="w-full rounded border p-2"
            />
          </div>

          <div>
            <label className="block font-medium">
              {tAddProduct('i-discount')}
            </label>
            <input
              type="number"
              {...register('discountPercentage', { valueAsNumber: true })}
              className="w-full rounded border p-2"
            />
          </div>

          <div>
            <label className="block font-medium">
              {tAddProduct('i-stock')}
            </label>
            <input
              type="number"
              {...register('stock', { valueAsNumber: true })}
              className="w-full rounded border p-2"
            />
          </div>

          <div>
            <label className="block font-medium">
              {tAddProduct('i-rating')}
            </label>
            <input
              type="number"
              step="0.1"
              {...register('rating', { valueAsNumber: true })}
              className="w-full rounded border p-2"
            />
          </div>

          <div>
            <label className="block font-medium">{tAddProduct('i-sku')}</label>
            <input {...register('sku')} className="w-full rounded border p-2" />
          </div>

          <div>
            <label className="block font-medium">
              {tAddProduct('i-weight')}
            </label>
            <input
              type="number"
              {...register('weight', { valueAsNumber: true })}
              className="w-full rounded border p-2"
            />
          </div>

          <div>
            <label className="block font-medium">
              {tAddProduct('i-policy')}
            </label>
            <input
              {...register('returnPolicy')}
              className="w-full rounded border p-2"
            />
          </div>
        </div>

        <div>
          <label className="block font-medium">
            {tAddProduct('i-description')}
          </label>
          <textarea
            {...register('description')}
            className="h-24 w-full rounded border p-2"
          />
        </div>

        <div>
          <label className="block font-medium">
            {tAddProduct('i-shipping')}
          </label>
          <textarea
            {...register('shippingInformation')}
            className="h-20 w-full rounded border p-2"
          />
        </div>

        <div>
          <label className="block font-medium">
            {tAddProduct('i-warrantly')}
          </label>
          <textarea
            {...register('warrantyInformation')}
            className="h-20 w-full rounded border p-2"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="rounded bg-blue-600 px-4 py-2 text-white"
        >
          {isPending ? tAddProduct('adding') : tAddProduct('submit')}
        </button>
      </form>

      {isSuccess && (
        <pre className="mt-4 rounded bg-gray-100 p-2 text-sm">
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
}
