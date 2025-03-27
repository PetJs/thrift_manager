import { createApiInstance } from "@/config/axios-instance";
import { useQuery } from '@tanstack/react-query';

const baseURL = import.meta.env.VITE_APP_BASE_URL;

export const useGET = ({
    url,
    queryKey,
    enabled = true,
  }: {
    url: string;
    queryKey: string[];
    withAuth?: boolean;
    enabled?: boolean;
  }) => {
    const fetchData = async() => {
        const apiInstance = createApiInstance(baseURL);

        const response = await apiInstance.get(`${url}`);
        return response.data;
    }

    const { data, isError, refetch } = useQuery({ queryKey: queryKey, queryFn: fetchData, enabled: enabled })

    return { data, isError, refetch };
  }