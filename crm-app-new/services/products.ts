export const fetchAllProducts = async () => {
  const response = await fetch("https://dummyjson.com/products");
  if (!response.ok) {
    throw new Error("Network response swas not ok");
  }
  return response.json();
};

export const paginationProducts = async (page: number, limit: number) => {
  const response = await fetch(
    `https://dummyjson.com/products?limit=${limit}&skip=${
      (page - 1) * limit
    }&select=title,price,description,stock`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const sortProducts = async (title: string, page: number, limit: number, sortType: string) => {
  const response = await fetch(
    `https://dummyjson.com/products?sortBy=${title}&order=${sortType}`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const searchProducts = async (key: string) => {
  const response = await fetch(
    `https://dummyjson.com/products/search?q=${key}`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};
