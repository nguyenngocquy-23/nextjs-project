export const login = async (username: string, password: string) => {
  const response = await fetch('https://dummyjson.com/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: username,
      password: password,
      expiresInMins: 30, // optional, defaults to 60
    }),
    // credentials: "include", // Include cookies (e.g., accessToken) in the request
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data;
};
