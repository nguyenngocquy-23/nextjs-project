import { fetchAllProducts, paginationProducts, searchProducts, sortProducts } from "@/services/products";
import { ProductResponse } from "@/type";
import { useQuery } from "@tanstack/react-query";

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

export const useSortProduct = (title: string, page: number, limit: number, sortType: string) => {
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
