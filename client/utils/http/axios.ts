import axios, {
  AxiosHeaders,
  type AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { ACCESS_TOKEN_COOKIE_KEY } from "@/constants/http";
import Cookies from "@/utils/cookies";
import isClient from "@/utils/is-client";

const REQUEST_TIMEOUT = 1000 * 60 * 5;

const axiosRequestMiddleware = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  const headers = new AxiosHeaders(config.headers);
  if (isClient()) {
    const accessToken = Cookies.get<string>(ACCESS_TOKEN_COOKIE_KEY);
    if (accessToken) {
      headers.set({ Authorization: `Bearer ${accessToken}` });
    }
  }

  return { ...config, headers };
};

const responseMiddleware = (response: AxiosResponse): AxiosResponse => response;

const axiosInstance = axios.create({
  timeout: REQUEST_TIMEOUT,
  headers: { "Content-Type": "application/json" },
});
axiosInstance.interceptors.request.use(axiosRequestMiddleware);

axiosInstance.interceptors.response.use(responseMiddleware);

export default axiosInstance;
