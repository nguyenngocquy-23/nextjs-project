import { Product } from "@/type";

export const fetchAllProducts = async () => {
  const response = await fetch("https://dummyjson.com/products");
  if (!response.ok) {
    throw new Error("Network response swas not ok");
  }
  return response.json();
};

export const addToCart = async (): Promise<Product> => {
  const response = await fetch("https://dummyjson.com/carts/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId: 1,
      products: [
        {
          id: 1,
          quantity: 4,
        },
        {
          id: 2,
          quantity: 1,
        },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to add product");
  }

  const data = await response.json();
  return data;
};

export const updateProduct = async (product: Product): Promise<Product> => {
  const updateProduct = { ...product };
  console.log("updateProduct...", updateProduct);
  const response = await fetch(`https://dummyjson.com/products/${product.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: product.title,
      price: product.price,
      stock: product.stock,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to add product");
  }

  const data = await response.json();
  return data;
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
