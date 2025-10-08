import { addToCart } from "@/services/carts";
import {
  addProduct,
} from "@/services/products";
import { useMutation } from "@tanstack/react-query";

// export const useCreateCart = () => {
//   return useQuery<>({
//     queryKey: ["products"],
//     queryFn: fetchAllProducts,
//   });
// };

export const useAddToCart = () => {
  return useMutation({
    mutationFn: () => addToCart(),
  });
};
