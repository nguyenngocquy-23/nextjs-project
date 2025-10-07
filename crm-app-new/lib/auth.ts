// lib/auth.ts

// Giả lập user — bạn có thể thay bằng real cookie/session logic sau này
export async function getUser() {
  // Simulate logged-in user
  const isLoggedIn = false; // 🔁 đổi thành true để test trạng thái đã login

  if (!isLoggedIn) return null;

  return {
    id: '123',
    name: 'John Doe',
    email: 'john@example.com'
  };
}
