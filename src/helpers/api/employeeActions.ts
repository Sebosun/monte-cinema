import { defaultClient } from "./axiosClient";

interface Arguments {
  user_email?: string;
  page?: number;
  per_page?: number;
}

export const getReservations = async ({
  user_email,
  page = 1,
  per_page = 25,
}: Arguments) => {
  return await defaultClient.get("/reservations", {
    params: {
      user_email: user_email && user_email,
      page,
      per_page,
    },
  });
};
