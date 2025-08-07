import axios from "axios";

import { AXIOS_HEADERS, ENV } from "@/config/constants";

const axiosInstance = axios.create({
  baseURL: `${ENV.SERVER_URL}/api`,
  headers: AXIOS_HEADERS,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    if (!config.url) {
      return config;
    }

    if (config.url.startsWith("/auth")) {
      return config;
    }

    const { data } = await axiosInstance.post("/auth/refresh-token");
    if (!data.accessToken) {
      return Promise.reject(new axios.Cancel("Failed to refresh token"));
    }

    config.headers.Authorization = `Bearer ${data.accessToken}`;
    return config;
  },
  (error) => Promise.reject(error),
);

export default axiosInstance;
