import router from "@/router";
import store from "@/store";
import axios from "axios";

export const defaultClient = axios.create({
  baseURL: "http://localhost:3000/",
  headers: { "Content-Type": "application/json" },
});

defaultClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      await store.dispatch("user/logout");
      // TODO remember redirection :facepalm:
      if (!(router.currentRoute.name === "Login")) {
        router.push({ name: "Login" });
      }
    }
    return Promise.reject(error);
  }
);

export const setAuthHeader = (authHeader) => {
  defaultClient.defaults.headers.common["Authorization"] = authHeader;
};

export const removeAuthHeader = () => {
  delete defaultClient.defaults.headers.common["Authorization"];
};
