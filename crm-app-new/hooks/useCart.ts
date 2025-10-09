// hooks/useCart.ts
import { addToCart, getCartById, getCartByUserId } from "@/services/carts";
import { CartItem, CartResponse, OverCartResponse } from "@/type";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetCartById = (cartId: number) => {
  return useQuery<CartResponse>({
    queryKey: ["cart-by-id", cartId],
    queryFn: () => getCartById(cartId),
    enabled: !!cartId,
  });
};

export const useGetOverCart = () => {
  return useQuery<OverCartResponse>({
    queryKey: ["over-cart"],
    queryFn: () => getCartByUserId(),
  });
};

export const useAddToCart = () => {
  return useMutation<CartResponse, Error, CartItem[]>({
    mutationFn: (products) => addToCart(products),
  });
};
