import { api } from "./api";

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

export interface RegisterResponse {
  message: string;
  userId: string;
}

export const register = async (
  email: string,
  password: string
): Promise<RegisterResponse> => {
  return api<RegisterResponse>("/auth/register", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
};

export const login = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  const data = await api<AuthResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  localStorage.setItem("accessToken", data.accessToken);
  localStorage.setItem("refreshToken", data.refreshToken);
localStorage.setItem("userEmail", email);
  return data;
};

export const logout = async (): Promise<void> => {
  const refreshToken = localStorage.getItem("refreshToken");

  if (refreshToken) {
    await api("/auth/logout", {
      method: "POST",
      body: JSON.stringify({ refreshToken }),
    });
  }

  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("userEmail");
};