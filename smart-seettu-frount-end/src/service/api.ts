import axios, { AxiosError } from "axios";
import { refreshTokenCall } from "./auth";

const api = axios.create({
  baseURL: "http://localhost:5000/api/v1",
});

const PUBLIC_ENDPOINT = [
  "/auth/login",
  "/auth/users/register",
  "/auth/callrefreshToken",
];
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const isPublic = PUBLIC_ENDPOINT.some((url) => config.url?.includes(url));

    if (!isPublic && token) {
      if (!config.headers) config.headers = {} as any;
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);
// ============  meken aaranne yana hama reqest ekakatama token ekak set karana eka  namuth public end-point walata arenna thamai eka karanne

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest: any = error.config;

    const isPublic = PUBLIC_ENDPOINT.some((url) =>
      originalRequest.url?.includes(url),
    );

    if (
      !isPublic &&
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("REFRESH_TOKEN") as string;

        if (!refreshToken) {
          throw new Error("No refresh token available");
        }

        const refreshRespons = await refreshTokenCall(refreshToken);

        const newAccsesTocken = refreshRespons.data.accessToken;
        localStorage.setItem("ACCESS_TOKEN", newAccsesTocken);

        // so now agin send the reqest   to the back end  with new  accessToken from using axios
        originalRequest.headers.Authorization = `Bearer ${newAccsesTocken}`;
        return axios(originalRequest);
      } catch (error) {
        localStorage.removeItem("ACCESS_TOKEN");
        localStorage.removeItem("REFRESH_TOKEN");
        window.location.href = "/login";
        console.error(error);
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  },
);

export default api;
