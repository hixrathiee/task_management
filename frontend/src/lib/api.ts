const BASE_URL = "http://localhost:5000";

export const api = async <T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const accessToken = localStorage.getItem("accessToken");

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      ...options.headers,
    },
  });

  const isAuthRoute =
    endpoint.includes("/auth/login") ||
    endpoint.includes("/auth/register");

  if (res.status === 401 && !isAuthRoute) {
    const refreshed = await refreshToken();

    if (refreshed) {
      return api<T>(endpoint, options); 
    } else {
      localStorage.clear();
      throw new Error("Session expired. Please login again.");
    }
  }

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Something went wrong");
  }

  return res.json();
};

async function refreshToken(): Promise<boolean> {
  const refreshToken = localStorage.getItem("refreshToken");

  if (!refreshToken) return false;

  const res = await fetch(`${BASE_URL}/auth/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refreshToken }),
  });

  if (!res.ok) return false;

  const data = await res.json();
  localStorage.setItem("accessToken", data.accessToken);

  return true;
}