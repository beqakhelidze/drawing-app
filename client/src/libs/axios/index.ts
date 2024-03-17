import axios, { InternalAxiosRequestConfig, AxiosError } from "axios";

const requestInterceptor = async (config: InternalAxiosRequestConfig) => {
  const controller = new AbortController();
  try {
    let token = localStorage.getItem("token");
	config.headers.Authorization = `Bearer ${token as string}`;
	return config;
  } catch (error) {
    controller.abort();
    return {
      ...config,
      signal: controller.signal,
    };
  }
};

const responseInterceptor = async (error: AxiosError) => {
  return await Promise.reject(error);
};

axios.defaults.baseURL = process.env.API_URL;

export const protectedRequestInterceptorId = axios.interceptors.request.use(
  requestInterceptor,
  () => {
	console.log('error from axios request interceptor');
  }
);

axios.interceptors.response.use((response) => response, responseInterceptor);
