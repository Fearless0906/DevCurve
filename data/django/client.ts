import client from "@/lib/client";
import { User } from "@/store/services/authService";

export const getUserProfile = async (token: string): Promise<User> => {
  const response = await client.get(`/accounts/auth/users/me/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
