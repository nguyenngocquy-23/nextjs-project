import { fetchProducts, paginationProducts } from "@/services/products";
import { ProductResponse } from "@/type";
import { useQuery } from "@tanstack/react-query";

export const useProducts = () => {
  return useQuery<ProductResponse>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
};

export const usePaginationProduct = (page: number, limit: number) => {
  return useQuery<ProductResponse>({
    queryKey: ["pagination-products", page, limit],
    queryFn: () => paginationProducts(page, limit),
  });
};
