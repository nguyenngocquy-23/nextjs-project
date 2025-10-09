// services/carts.ts
import { CartItem, CartResponse, Product } from "@/type";

export const getCartById = async (cartId: number) => {
  const response = await fetch(`https://dummyjson.com/carts/${cartId}`);
  if (!response.ok) {
    throw new Error("Network response swas not ok");
  }
  return response.json();
};

export const getCartByUserId = async () => {
  const response = await fetch("https://dummyjson.com/carts");
  if (!response.ok) {
    throw new Error("Network response swas not ok");
  }
  return response.json();
};

export const addToCart = async (
  products: CartItem[]
): Promise<CartResponse> => {
  const response = await fetch("https://dummyjson.com/carts/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId: 1,
      products,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to add to cart");
  }

  return response.json();
};

export const deleteProduct = async (productId: number): Promise<Product> => {
  const response = await fetch(`https://dummyjson.com/products/${productId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to add product");
  }

  const data = await response.json();
  return data;
};
