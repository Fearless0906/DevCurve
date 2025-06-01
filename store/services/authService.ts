import client from "@/lib/client";

interface LoginData {
  email: string;
  password: string;
}

interface SignupData {
  name: string;
  email: string;
  password: string;
  re_password: string;
}

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  name: string;
  avatar?: string;
}

interface ResetPasswordData {
  email: string;
}

interface ResetPasswordConfirmData {
  uid: string;
  token: string;
  new_password: string;
  re_new_password: string;
}

class AuthService {
  async login(data: LoginData) {
    const response = await client.post(`/accounts/auth/jwt/create/`, data);

    // Set token in cookie with HTTP-only flag
    document.cookie = `token=${response.data.access}; path=/; max-age=86400; secure; samesite=strict`;

    return response.data;
  }

  async getUserProfile(token: string): Promise<User> {
    const response = await client.get(`/accounts/auth/users/me/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Ensure all fields are present
    const userData: User = {
      ...response.data,
      first_name: response.data.first_name || "",
      last_name: response.data.last_name || "",
      name:
        response.data.name ||
        `${response.data.first_name} ${response.data.last_name}`.trim(),
    };

    return userData;
  }

  async signup(data: SignupData) {
    const response = await client.post(`/accounts/auth/users/`, data);
    return response.data;
  }

  async activate(data: { uid: string; token: string }) {
    const response = await client.post(`/accounts/auth/users/activation/`, {
      uid: data.uid,
      token: data.token,
    });
    return response.data;
  }

  async resetPassword(data: ResetPasswordData) {
    const response = await client.post(
      `/accounts/auth/users/reset_password/`,
      data,
    );
    return response.data;
  }

  async resetPasswordConfirm(data: ResetPasswordConfirmData) {
    const response = await client.post(
      `/accounts/auth/users/reset_password_confirm/`,
      data,
    );
    return response.data;
  }

  async logout() {
    // Clear the token cookie by setting it to expire immediately
    document.cookie =
      "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; secure; samesite=strict";
  }
}

export default new AuthService();
