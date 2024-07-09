import type { AxiosRequestHeaders } from "axios";
import axios from "axios";
import { getSession } from "next-auth/react";

// Create a new Axios instance
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

// Create the interceptor
axiosInstance.interceptors.request.use(async (request) => {
  const session = await getSession();

  if (session) {
    request.headers = {
      ...request.headers,
      Authorization: `Bearer ${session.jwt}`,
    } as AxiosRequestHeaders;
  }

  return request;
});

export const BackendInstance = axiosInstance;