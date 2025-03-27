import { createApiInstance } from "@/config/axios-instance";
import { useMutation } from "@tanstack/react-query";

const baseURL = import.meta.env.VITE_APP_BASE_URL;

export const useDELETE = ({
  url,
  onSuccess,
  onError,
}: {
  url: string;
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}) => {
  const apiInstance = createApiInstance(baseURL);

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await apiInstance.delete(url);
      return response.data;
    },
    onSuccess,
    onError,
  });

  return mutation;
};
