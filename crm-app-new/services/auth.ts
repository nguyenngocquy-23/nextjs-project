export const login = async () => {
  const response = await fetch("https://dummyjson.com/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: "emilys",
      password: "emilyspass",
      expiresInMins: 30, // optional, defaults to 60
    }),
    // credentials: "include", // Include cookies (e.g., accessToken) in the request
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  console.log("✅ Login response:", data);
  return data;
};
