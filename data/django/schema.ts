import client from "@/lib/client";
import { User } from "@/store/services/authService";
import { ComponentResponse } from "@/types";

export const getUserAvatar = async (): Promise<User> => {
  try {
    const response = await client.get<User>(`/accounts/auth/users/me/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user avatar:", error);
    throw error;
  }
};

export const CreateComponent = async (
  formData: FormData,
): Promise<ComponentResponse> => {
  try {
    const response = await client.post<ComponentResponse>(
      `/component/projects/`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error creating component:", error);
    throw error;
  }
};

export const getAllComponents = async (): Promise<ComponentResponse[]> => {
  try {
    const response =
      await client.get<ComponentResponse[]>(`/component/projects/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching components:", error);
    return [];
  }
};

export const getComponentById = async (
  id: string | number,
): Promise<ComponentResponse | null> => {
  try {
    const response = await client.get<ComponentResponse>(
      `/component/projects/${id}/`,
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching component:", error);
    return null;
  }
};

export const CreateGuide = async (formData: FormData) => {
  try {
    const response = await client.post(`/component/guides/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating guide:", error);
    throw error;
  }
};
