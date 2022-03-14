import { defaultClient } from "./axiosClient";

export const register = async (credentials) =>
  defaultClient.post("/register", {
    user: {
      email: credentials.email,
      password: credentials.password,
      first_name: credentials.first_name,
      last_name: credentials.last_name,
      date_of_birth: credentials.date_of_birth,
    },
  });

export const login = async (credentials) =>
  defaultClient.post("/login", {
    user: {
      email: credentials.email,
      password: credentials.password,
    },
  });

export const logout = async () => defaultClient.delete("/logout");

export const getUser = async () => defaultClient.get("/user");
