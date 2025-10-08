import { addToCart, getCartByUserId } from "@/services/carts";
import { CartProduct, CartResponse, OverCartResponse } from "@/type";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetCart = () => {
  return useQuery<OverCartResponse>({
    queryKey: ['cart'],
    queryFn: () => getCartByUserId(),
  })
};

export const useAddToCart = () => {
  return useMutation<CartResponse, Error, CartProduct[]>({
    mutationFn: (products) => addToCart(products),
  });
};
