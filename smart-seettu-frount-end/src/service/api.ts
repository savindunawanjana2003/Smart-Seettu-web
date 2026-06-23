import axios, { AxiosError } from "axios";
import { refreshTokenCall } from "./auth";
import Swal from "sweetalert2";

const api = axios.create({
  baseURL: "http://localhost:3001/api/v1",
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

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest: any = error.config;

    if (!originalRequest) {
      return Promise.reject(error);
    }

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

        originalRequest.headers.Authorization = `Bearer ${newAccsesTocken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error(refreshError);

        localStorage.removeItem("ACCESS_TOKEN");
        localStorage.removeItem("REFRESH_TOKEN");
        localStorage.removeItem("currentCustomer");
        localStorage.removeItem("curentGrupId");

        await Swal.fire({
          title: "Logging out..",
          text: "Access denied. Please sign in again.",
          icon: "info",
          timer: 3000,
          showConfirmButton: false,
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        window.location.href = "/";

        console.error(refreshError);
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

export default api;
