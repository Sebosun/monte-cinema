import { defaultClient } from "./axiosClient";

interface ReservationData {
  seance_id: number;
  tickets: {
    seat: string;
    ticket_type_id: number;
  }[];
}

interface UserCreds {
  firstName?: string;
  lastName?: string;
  birthday?: string;
  email?: string;
  newPassword?: string;
  currentPassword: string;
}

export const bookReservations = async (data: ReservationData) =>
  defaultClient.post("/reservations/online", {
    seance_id: data.seance_id,
    tickets: [...data.tickets],
  });
export const showCurrentUser = async () => defaultClient.get("/user");

export const getUserReservations = async (page = 5, per_page = 10) => {
  const userCreds = await showCurrentUser();
  console.log(userCreds);
  return await defaultClient.get("/reservations", {
    params: {
      user_email: userCreds.data.email,
      page,
      per_page,
    },
  });
};

export const updateCurrentUser = async ({
  firstName,
  lastName,
  birthday,
  email,
  newPassword,
  currentPassword,
}: UserCreds) =>
  defaultClient.patch("/user", {
    user: {
      first_name: firstName && firstName,
      last_name: lastName && lastName,
      date_of_birth: birthday && birthday,
      email: email && email,
      password: newPassword && newPassword,
      current_password: currentPassword,
    },
  });
