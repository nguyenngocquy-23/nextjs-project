import {
  addProduct,
  deleteProduct,
  fetchAllProducts,
  paginationProducts,
  searchProducts,
  sortProducts,
  updateProduct,
} from "@/services/products";
import { Product, ProductResponse } from "@/type";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useProducts = () => {
  return useQuery<ProductResponse>({
    queryKey: ["products"],
    queryFn: fetchAllProducts,
  });
};

export const usePaginationProduct = (page: number, limit: number) => {
  return useQuery<ProductResponse>({
    queryKey: ["pagination-products", page, limit],
    queryFn: () => paginationProducts(page, limit),
  });
};

export const useSortProduct = (
  title: string,
  page: number,
  limit: number,
  sortType: string
) => {
  return useQuery<ProductResponse>({
    queryKey: ["sort-products", title, page, limit, sortType],
    queryFn: () => sortProducts(title, page, limit, sortType),
  });
};

export const useSearchProduct = (key: string) => {
  return useQuery<ProductResponse>({
    queryKey: ["search-products", key],
    queryFn: () => searchProducts(key),
  });
};

export const useAddProduct = () => {
  return useMutation({
    mutationFn: (newProduct: Product) => addProduct(newProduct),
  });
};

export const useUpdateProduct = () => {
  return useMutation({
    mutationFn: (product: Product) => updateProduct(product),
  });
};

export const useDeleteProduct = () => {
  return useMutation({
    mutationFn: (productId: number) => deleteProduct(productId),
  });
};
