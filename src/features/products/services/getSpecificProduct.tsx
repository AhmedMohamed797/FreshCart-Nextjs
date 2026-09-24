import { apiClient } from "@/services/apiClient";
import { AxiosRequestConfig } from "axios";

export async function getSpecificProduct({ id }: { id: string }) {
  const options: AxiosRequestConfig = {
    url: `/products/${id}`,
    method: "GET",
  };

  const { data } = await apiClient.request(options);
  return data;
}
