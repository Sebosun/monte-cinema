import { defaultClient } from "./axiosClient";

interface ReservationData {
  seance_id: number;
  tickets: {
    seat: string;
    ticket_type_id: number;
  }[];
}

export const bookReservations = async (data: ReservationData) =>
  defaultClient.post("/reservations/online", {
    seance_id: data.seance_id,
    tickets: [...data.tickets],
  });

interface UserCreds {
  firstName?: string;
  lastName?: string;
  birthday?: string;
  email?: string;
  newPassword?: string;
  currentPassword: string;
}

export const showCurrentUser = async () => defaultClient.get("/user");

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
