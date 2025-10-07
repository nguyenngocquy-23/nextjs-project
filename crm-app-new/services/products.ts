export const fetchProducts = async () => {
  const response = await fetch("https://dummyjson.com/products");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const paginationProducts = async (page: number, limit: number) => {
  const response = await fetch(
    "https://dummyjson.com/products?limit=10&skip=10&select=title,price"
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};
