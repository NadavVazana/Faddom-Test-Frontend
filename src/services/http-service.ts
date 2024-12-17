import Axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from "axios";

const BASE_URL = "http://localhost:3030/api/";

const axios: AxiosInstance = Axios.create();

export const httpService = {
  async get(endpoint: string, data?: any) {
    return ajax(endpoint, "GET", data);
  },
  async post(endpoint: string, data?: any) {
    return ajax(endpoint, "POST", data);
  },
  async put(endpoint: string, data?: any) {
    return ajax(endpoint, "PUT", data);
  },
  async delete(endpoint: string, data?: any) {
    return ajax(endpoint, "DELETE", data);
  },
};

async function ajax(
  endpoint: string,
  method: string = "GET",
  data: any = null
) {
  try {
    const config: AxiosRequestConfig = {
      url: `${BASE_URL}${endpoint}`,
      method,
      data: method === "GET" ? null : data,
      params: method === "GET" ? data : null,
    };

    const res = await axios(config);

    return res.data;
  } catch (err) {
    if (Axios.isAxiosError(err)) {
      const axiosError = err as AxiosError;
      console.log(`Response status: ${axiosError.response?.status}`);
    }
    console.log(
      `Had Issues ${method}ing to the backend, endpoint: ${endpoint}, with data: `,
      data
    );
    throw err;
  }
}
